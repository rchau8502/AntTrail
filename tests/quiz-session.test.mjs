import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire, registerHooks } from "node:module";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

import {
  getInitialPracticeFilters,
  getPracticeSessionCards,
  isOptionalCard,
} from "../src/lib/practice-session.ts";

const sourceRoot = new URL("../src/", import.meta.url);

// Exercise the real component with the project's existing React/TypeScript
// dependencies, including the same source aliases used by Next.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/")) {
      for (const extension of [".ts", ".tsx"]) {
        const url = new URL(`${specifier.slice(2)}${extension}`, sourceRoot);
        if (existsSync(url)) {
          return nextResolve(fileURLToPath(url), context);
        }
      }
    }

    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url.startsWith(sourceRoot.href) && /\.tsx?$/.test(url)) {
      const { outputText } = ts.transpileModule(readFileSync(new URL(url), "utf8"), {
        fileName: fileURLToPath(url),
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          jsx: ts.JsxEmit.ReactJSX,
          esModuleInterop: true,
          target: ts.ScriptTarget.ES2020,
        },
      });

      return { format: "commonjs", source: outputText, shortCircuit: true };
    }

    return nextLoad(url, context);
  },
});

// Node 22 needs the CommonJS entry path to apply hooks to nested requires.
const requireSource = createRequire(import.meta.url);
const { RecognitionQuiz } = requireSource("../src/components/recognition-quiz.tsx");
const { StudyMode } = requireSource("../src/components/study-mode.tsx");
const { LanguageProvider } = requireSource("../src/components/language-provider.tsx");
const { allCards } = requireSource("../src/lib/bubble.ts");

const cards = [
  { id: "first", course: "Algebra", unit: "Vectors", chapter: "Core" },
  { id: "focused", course: "Algebra", unit: "Vectors", chapter: "Core" },
  { id: "last", course: "Algebra", unit: "Vectors", chapter: "Core" },
  { id: "other-unit", course: "Algebra", unit: "Matrices", chapter: "Core" },
  { id: "other-course", course: "Geometry", unit: "Vectors", chapter: "Core" },
  {
    id: "optional",
    course: "Algebra",
    unit: "Extension",
    chapter: "Later / optional extras",
  },
];

const quizCards = cards.map((card, order) => ({
  ...card,
  subject: "Math",
  topic: card.id,
  name: `Topic ${card.id}`,
  order,
  useItWhen: `Recognize ${card.id}`,
  looksLike: `Cue ${card.id}`,
  doThis: `Use technique ${card.id}`,
  thinkOfItAs: `Idea ${card.id}`,
  watchOutFor: `Trap ${card.id}`,
  rememberThis: `Remember ${card.id}`,
  quickExample: { problem: `Cue ${card.id}`, move: `Use technique ${card.id}` },
  typicalProblemShapes: [`Cue ${card.id}`],
  miniDrill: [],
  memoryHook: `Hook ${card.id}`,
  tags: [],
  difficulty: "Starter",
}));

function renderPractice(Component, initialCardId, catalog = quizCards, locale = "en") {
  const previousWindow = globalThis.window;
  globalThis.window = {
    localStorage: { getItem: () => locale },
    location: new URL("http://localhost/quiz"),
  };

  try {
    return renderToStaticMarkup(
      createElement(
        LanguageProvider,
        null,
        createElement(Component, { cards: catalog, initialCardId }),
      ),
    );
  } finally {
    if (previousWindow === undefined) {
      delete globalThis.window;
    } else {
      globalThis.window = previousWindow;
    }
  }
}

function renderQuiz(initialCardId, catalog = quizCards, locale = "en") {
  return renderPractice(RecognitionQuiz, initialCardId, catalog, locale);
}

test("a focused session starts with its topic and visits every card in that unit", () => {
  const filters = getInitialPracticeFilters(cards, "focused");
  const session = getPracticeSessionCards(cards, filters, "focused");

  assert.deepEqual(
    session.map((card) => card.id),
    ["focused", "last", "first"],
  );
  assert.equal(filters.courseFilter, "Algebra");
  assert.equal(filters.unitFilter, "Vectors");
  assert.equal(cards[0].id, "first", "session ordering must not mutate the catalog");
});

test("an explicit optional focus is included in its initial session", () => {
  const filters = getInitialPracticeFilters(cards, "optional");

  assert.equal(filters.coreOnly, false);
  assert.deepEqual(
    getPracticeSessionCards(cards, filters, "optional").map((card) => card.id),
    ["optional"],
  );
});

test("an unknown focus falls back to the normal core session", () => {
  const filters = getInitialPracticeFilters(cards, "missing");

  assert.deepEqual(filters, {
    courseFilter: "All",
    unitFilter: "All",
    coreOnly: true,
  });
  assert.deepEqual(
    getPracticeSessionCards(cards, filters, "missing").map((card) => card.id),
    ["first", "focused", "last", "other-unit", "other-course"],
  );
});

test("new filters do not pull a previous focus back into the session", () => {
  const filters = {
    ...getInitialPracticeFilters(cards, "focused"),
    courseFilter: "Geometry",
  };

  assert.deepEqual(
    getPracticeSessionCards(cards, filters, "focused").map((card) => card.id),
    ["other-course"],
  );
});

test("turning off the core filter includes optional cards", () => {
  const filters = { ...getInitialPracticeFilters(cards), coreOnly: false };

  assert.equal(getPracticeSessionCards(cards, filters).length, cards.length);
});

test("empty scopes produce an empty queue without adding a focused card", () => {
  const filters = {
    courseFilter: "Geometry",
    unitFilter: "Matrices",
    coreOnly: true,
  };

  assert.deepEqual(getPracticeSessionCards(cards, filters, "focused"), []);
  assert.deepEqual(getPracticeSessionCards([], filters), []);
});

test("optional-card detection accepts English, Spanish, and Chinese metadata", () => {
  for (const label of ["Later / optional", "Extras opcionales", "后续 / 可选"]) {
    assert.equal(isOptionalCard({ chapter: label, unit: "Core" }), true);
    assert.equal(isOptionalCard({ chapter: "Core", unit: label }), true);
  }

  assert.equal(isOptionalCard({ chapter: "Core", unit: "Vectors" }), false);
});

test("the quiz renders its focused topic as question one within the requested unit", () => {
  const html = renderQuiz("focused");

  assert.equal(html.includes("Cue focused"), true, "show the requested topic");
  assert.equal(html.includes("Cue first"), false, "do not start at another topic");
  assert.match(html, /<option value="Algebra" selected="">Algebra<\/option>/);
  assert.match(html, /<option value="Vectors" selected="">Vectors<\/option>/);
  assert.match(html.replace(/<[^>]*>/g, ""), /Score: 0 · 1 \/ 3/);
});

test("the quiz renders an optional focus with the core-only checkbox off", () => {
  const html = renderQuiz("optional");
  const checkbox = html.match(/<input[^>]*type="checkbox"[^>]*>/)?.[0];

  assert.equal(html.includes("Cue optional"), true, "show the optional topic");
  assert.ok(checkbox);
  assert.doesNotMatch(checkbox, /checked/);
  assert.match(html.replace(/<[^>]*>/g, ""), /Score: 0 · 1 \/ 1/);
});

test("the quiz renders the ordinary core session for an unknown focus", () => {
  const html = renderQuiz("missing");

  assert.match(html, /Cue first/);
  assert.match(html.replace(/<[^>]*>/g, ""), /Score: 0 · 1 \/ 5/);
});

test("translated unit labels keep canonical filter values", () => {
  const html = renderQuiz("prob-permutations", allCards, "es");
  const selectedUnit = html.match(
    /<option value="Counting" selected="">([^<]+)<\/option>/,
  )?.[1];

  assert.equal(selectedUnit, "Conteo");
  assert.equal(html.includes("Elige y ordena 3 estudiantes de 10."), true);
});

test("Study opens an explicitly requested optional topic", () => {
  const html = renderPractice(StudyMode, "optional");

  assert.match(html, /<h2[^>]*>Topic optional<\/h2>/);
  const checkbox = html.match(/<input[^>]*type="checkbox"[^>]*>/)?.[0];
  assert.ok(checkbox);
  assert.doesNotMatch(checkbox, /checked/);
});

test("Study keeps filters available when the core scope is empty", () => {
  const html = renderPractice(
    StudyMode,
    undefined,
    quizCards.filter((card) => card.id === "optional"),
  );

  assert.equal((html.match(/<select\b/g) ?? []).length, 2);
  assert.match(html, /<input[^>]*type="checkbox"[^>]*checked/);
  assert.doesNotMatch(html, /<h2[^>]*>Topic optional<\/h2>/);
});

test("Study translates unit labels without changing filter values", () => {
  const html = renderPractice(StudyMode, "prob-permutations", allCards, "es");

  assert.match(html, /<option value="Counting">Conteo<\/option>/);
  assert.match(html, /<h2[^>]*>Permutaciones<\/h2>/);
});
