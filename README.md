# Bubble

Bubble is a math learning app.

It teaches the outer shell of a topic:

- what the skill is
- when to use it
- what it looks like
- what to do
- a metaphor
- a warning
- a takeaway

Bubble is built to answer three fast questions:

- What is this?
- When do I use it?
- What do I do first?

Bubble now covers Single-Variable Calculus I, Single-Variable Calculus II, Multivariable Calculus I, Multivariable Calculus II, Introduction to Abstract Mathematics, Introduction to Linear Algebra, Probability I, Probability II, Elementary Differential Equations, Introduction to Abstract Algebra: Groups, Linear Algebra I, and Elementary Analysis I.

## Product philosophy

Bubble is intentionally light, practical, and easy to scan.

- It prioritizes recognition over proof.
- It helps students decide what to try first.
- It keeps wording short, scannable, and memorable.
- It is built for homework survival, quiz prep, and exam review.
- It does not aim for deep theory or proof-heavy rigor.

Every topic is stored as a structured Bubble Card with the same teaching shape:

1. Name
2. Use it when
3. Looks like
4. Do this
5. Think of it as
6. Watch out for
7. Remember this

The app also adds:

- typical problem shapes
- a quick example
- mini drills
- a short memory hook

## Writing style

- short
- practical
- memorable
- non-textbook
- student-friendly
- high scanability
- no bloated explanations

## Current features

- Landing page with Bubble philosophy and multi-course entry point
- Topic dashboard with course grouping, search, difficulty filter, and chapter filter
- Bubble Card detail pages
- Study mode with course and unit filtering
- Recognition quiz focused on “which technique fits?” across all current courses
- Memory Hook view for fast cram review across all courses

## Tech stack

- Next.js 16
- TypeScript
- Tailwind CSS 4
- App Router
- Local structured content in TypeScript files
- Content kept separate from UI with a reusable typed schema

## AI default

Future AI features in Bubble and Bubblegum should use `gpt-5-mini` by default for the best price-to-performance balance.

- shared config: [`src/lib/ai.ts`](./src/lib/ai.ts)
- default model: `gpt-5-mini`
- optional override: `NEXT_PUBLIC_OPENAI_MODEL` or `OPENAI_MODEL`

## Project structure

```text
src/
  app/
    page.tsx
    topics/
    study/
    quiz/
    memory-hooks/
  components/
    site-header.tsx
    topic-explorer.tsx
    study-mode.tsx
    recognition-quiz.tsx
  content/
    schema.ts
    calc1.ts
    calc2.ts
    calc3.ts
    linear-algebra.ts
    proof.ts
    probability.ts
  lib/
    bubble.ts
```

Current seeded content: 283 Bubble Cards across six courses.

## Content model

Bubble Cards live in the course files in [`src/content`](./src/content) and follow the shared schema in [`src/content/schema.ts`](./src/content/schema.ts).

Each card includes fields such as:

- `id`
- `subject`
- `course`
- `chapter`
- `unit`
- `topic`
- `name`
- `useItWhen`
- `looksLike`
- `doThis`
- `thinkOfItAs`
- `watchOutFor`
- `rememberThis`
- `quickExample`
- `typicalProblemShapes`
- `miniDrill`
- `memoryHook`
- `tags`
- `difficulty`

## How to add more Bubble Cards

1. Open the course file you want to extend in [`src/content`](./src/content).
2. Add another `makeCalcCard(...)` entry with the same schema.
3. Give it a unique `id` and the correct `order`, `unit`, and `chapter`.
4. Keep the copy short, practical, and pattern-first.
5. Every card should feel like: here is the shape, here is when it shows up, here is the move, do not miss this trap.
6. The dashboard, detail pages, study mode, quiz, and memory hooks will pick it up automatically.

## How to add more courses later

The codebase is already organized for future subjects like Differential Equations and other upper-division math courses.

To expand:

1. Create a new content file beside [`src/content/calc1.ts`](./src/content/calc1.ts).
2. Export a new `CourseContent` object using the shared schema.
3. Register it in [`src/lib/bubble.ts`](./src/lib/bubble.ts).
4. Add course-aware navigation or routing when the second course is ready.

The current UI already supports multiple courses, and the content layer stays separated from the UI so more subjects can be added without a rewrite.
