import assert from "node:assert/strict";
import { afterEach, beforeEach, mock, test } from "node:test";

import * as progress from "../src/lib/progress.ts";

const previousWindow = globalThis.window;
let storage;
let events;

beforeEach(() => {
  storage = new Map();
  events = [];
  globalThis.window = {
    localStorage: {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value),
    },
    dispatchEvent: (event) => events.push(event.type),
  };
  mock.method(Date, "now", () => 1_000);
});

afterEach(() => {
  mock.restoreAll();
  if (previousWindow === undefined) {
    delete globalThis.window;
  } else {
    globalThis.window = previousWindow;
  }
});

test("an unclassified miss is saved immediately with its attempt token", () => {
  const token = progress.recordBubblegumAttempt("topic", "missedIt");
  const saved = progress.getBubblegumTopicProgress("topic");

  assert.equal(saved.missedIt, 1);
  assert.equal(saved.gotIt, 0);
  assert.equal(saved.lastOutcome, "missedIt");
  assert.equal(saved.lastMissType, undefined);
  assert.equal(token, saved.lastAttemptedAt);
  assert.equal(typeof token, "number");
  assert.deepEqual(events, [progress.BUBBLE_PROGRESS_EVENT]);
});

test("successive attempts have distinct tokens even in the same millisecond", () => {
  const first = progress.recordBubblegumAttempt("topic", "missedIt");
  const second = progress.recordBubblegumAttempt("topic", "missedIt");

  assert.notEqual(first, second);
  assert.equal(second, progress.getBubblegumTopicProgress("topic").lastAttemptedAt);
});

test("a diagnosis enriches the saved miss without recording another attempt", () => {
  progress.recordBubblegumAttempt("topic", "missedIt", "setup");
  const token = progress.recordBubblegumAttempt("topic", "missedIt");
  const before = progress.getBubblegumTopicProgress("topic");

  assert.equal(progress.attachBubblegumMissType?.("topic", token, "execution"), true);
  const after = progress.getBubblegumTopicProgress("topic");

  assert.equal(after.gotIt, before.gotIt);
  assert.equal(after.missedIt, before.missedIt);
  assert.equal(after.lastAttemptedAt, token);
  assert.equal(after.lastOutcome, "missedIt");
  assert.equal(after.lastMissType, "execution");
  assert.deepEqual(after.missTypeCounts, { setup: 1, execution: 1 });
  assert.equal(events.length, 3);
});

test("duplicate or contradictory diagnoses cannot count a saved miss twice", () => {
  const token = progress.recordBubblegumAttempt("topic", "missedIt");
  assert.equal(progress.attachBubblegumMissType?.("topic", token, "setup"), true);
  const before = progress.getBubblegumTopicProgress("topic");

  assert.equal(progress.attachBubblegumMissType?.("topic", token, "setup"), false);
  assert.equal(progress.attachBubblegumMissType?.("topic", token, "proof"), false);

  assert.deepEqual(progress.getBubblegumTopicProgress("topic"), before);
  assert.equal(events.length, 2);
});

test("a stale diagnosis cannot attach to the next miss in the same millisecond", () => {
  const first = progress.recordBubblegumAttempt("topic", "missedIt");
  const second = progress.recordBubblegumAttempt("topic", "missedIt");
  const before = progress.getBubblegumTopicProgress("topic");

  assert.equal(progress.attachBubblegumMissType?.("topic", first, "proof"), false);
  assert.deepEqual(progress.getBubblegumTopicProgress("topic"), before);
  assert.equal(progress.attachBubblegumMissType?.("topic", second, "recognition"), true);
  assert.deepEqual(progress.getBubblegumTopicProgress("topic").missTypeCounts, {
    recognition: 1,
  });
});

test("diagnoses cannot attach to a success, unknown topic, or already classified miss", () => {
  const miss = progress.recordBubblegumAttempt("topic", "missedIt");
  const success = progress.recordBubblegumAttempt("topic", "gotIt");

  assert.equal(progress.attachBubblegumMissType?.("topic", miss, "proof"), false);
  assert.equal(progress.attachBubblegumMissType?.("topic", success, "proof"), false);
  assert.equal(progress.attachBubblegumMissType?.("unknown", success, "proof"), false);
  assert.deepEqual(progress.getBubblegumTopicProgress("topic").missTypeCounts, {});

  const classified = progress.recordBubblegumAttempt("topic", "missedIt", "setup");
  assert.equal(progress.attachBubblegumMissType?.("topic", classified, "proof"), false);
  assert.deepEqual(progress.getBubblegumTopicProgress("topic").missTypeCounts, { setup: 1 });
  assert.equal(events.length, 3);
});
