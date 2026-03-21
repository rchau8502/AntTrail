const BUBBLEGUM_MASTERED_KEY = "bubblegum-mastered-topics";
const BUBBLEGUM_ATTEMPTS_KEY = "bubblegum-topic-attempts";
export const BUBBLE_PROGRESS_EVENT = "bubble-progress-updated";

export interface BubblegumTopicProgress {
  gotIt: number;
  missedIt: number;
  lastOutcome?: "gotIt" | "missedIt";
}

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readSet(key: string) {
  if (!canUseStorage()) {
    return new Set<string>();
  }

  try {
    const raw = window.localStorage.getItem(key);

    if (!raw) {
      return new Set<string>();
    }

    const parsed = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set<string>();
  }
}

function writeSet(key: string, values: Set<string>) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify([...values].sort()));
  window.dispatchEvent(new CustomEvent(BUBBLE_PROGRESS_EVENT));
}

function readMap<T>(key: string) {
  if (!canUseStorage()) {
    return {} as Record<string, T>;
  }

  try {
    const raw = window.localStorage.getItem(key);

    if (!raw) {
      return {} as Record<string, T>;
    }

    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as Record<string, T>) : ({} as Record<string, T>);
  } catch {
    return {} as Record<string, T>;
  }
}

function writeMap<T>(key: string, value: Record<string, T>) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent(BUBBLE_PROGRESS_EVENT));
}

export function isBubblegumTopicMastered(id: string) {
  return readSet(BUBBLEGUM_MASTERED_KEY).has(id);
}

export function setBubblegumTopicMastered(id: string, mastered: boolean) {
  const values = readSet(BUBBLEGUM_MASTERED_KEY);

  if (mastered) {
    values.add(id);
  } else {
    values.delete(id);
  }

  writeSet(BUBBLEGUM_MASTERED_KEY, values);
}

export function recordBubblegumAttempt(
  id: string,
  outcome: "gotIt" | "missedIt",
) {
  const attempts = readMap<BubblegumTopicProgress>(BUBBLEGUM_ATTEMPTS_KEY);
  const current = attempts[id] ?? { gotIt: 0, missedIt: 0 };

  attempts[id] = {
    gotIt: current.gotIt + (outcome === "gotIt" ? 1 : 0),
    missedIt: current.missedIt + (outcome === "missedIt" ? 1 : 0),
    lastOutcome: outcome,
  };

  writeMap(BUBBLEGUM_ATTEMPTS_KEY, attempts);
}

export function getBubblegumTopicProgress(id: string): BubblegumTopicProgress {
  return readMap<BubblegumTopicProgress>(BUBBLEGUM_ATTEMPTS_KEY)[id] ?? {
    gotIt: 0,
    missedIt: 0,
  };
}

export function getBubblegumTopicProgressMap() {
  return readMap<BubblegumTopicProgress>(BUBBLEGUM_ATTEMPTS_KEY);
}
