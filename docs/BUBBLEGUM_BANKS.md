# Bubblegum Banks

Bubblegum banks are the hand-built practice sets that override the generated drills for specific topics.

They live in [`src/content/bubblegum-banks.ts`](../src/content/bubblegum-banks.ts).

## Why this file exists

Generated drills are useful for broad coverage.

Hand-built banks are better when:

- a professor wants a more course-realistic prompt
- a topic has a very standard midterm/final pattern
- the first step needs to be taught in a very specific way
- the topic is proof-heavy and generic generation sounds too vague

## Bank shape

Each top-level key is a Bubble Card `id`.

Example shape:

```ts
"some-card-id": {
  quiz: [
    {
      prompt: { en: "...", es: "...", zh: "..." },
      firstStep: { en: "...", es: "...", zh: "..." },
      setup: { en: "...", es: "...", zh: "..." },
      fullPath: [
        { en: "...", es: "...", zh: "..." },
        { en: "...", es: "...", zh: "..." }
      ],
      answer: { en: "...", es: "...", zh: "..." },
      selfCheck: { en: "...", es: "...", zh: "..." },
      whyFits: { en: "...", es: "...", zh: "..." },
      notationHelp: [
        { en: "...", es: "...", zh: "..." }
      ]
    }
  ],
  midterm: [...],
  final: [...]
}
```

## What to write

Keep every field practical and short.

- `prompt`: sound like a real homework, quiz, midterm, or final problem
- `firstStep`: the first correct move, not the whole solution
- `setup`: why this method fits
- `fullPath`: a clean 2-4 step path, not a textbook proof dump
- `answer`: final result or final conclusion
- `selfCheck`: one fast line the student can remember next time
- `whyFits`: why this problem belongs to this topic
- `notationHelp`: only include when notation is actually a barrier

## Writing rules

- prefer course-realistic questions over generic wording
- teach the move first
- do not add long proofs unless the course really needs them
- keep Spanish and Chinese natural, not literal
- if one language is uncertain, fix the English first and then localize carefully

## Validation

Run:

```bash
npm run validate:bubblegum
```

This checks:

- every bank key matches a real Bubble Card id
- every level is `quiz`, `midterm`, or `final`
- required localized fields exist
- `fullPath` is not empty
- optional localized arrays like `notationHelp` are shaped correctly

## Recommended workflow for collaborators

1. Pick a course and topic with weak or generic Bubblegum coverage.
2. Add one good `quiz` seed first.
3. Add `midterm` and `final` only if the topic has a real difficulty ladder.
4. Run `npm run validate:bubblegum`.
5. Open the topic in Bubblegum and check whether the first step sounds like what you would tell a student in office hours.
