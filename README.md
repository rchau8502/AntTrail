# Bubble

Bubble is a shallow-but-useful math learning app for stressed college students who need fast recognition, not long explanations.

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

For the MVP, Bubble focuses on Calculus 1 only.

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

## MVP features

- Landing page with Bubble philosophy and Calc 1 entry point
- Topic dashboard with grouping, search, difficulty filter, and chapter filter
- Bubble Card detail pages
- Study mode with tap-to-reveal cards
- Recognition quiz focused on “which technique fits?”
- Memory Hook view for fast cram review

## Tech stack

- Next.js 16
- TypeScript
- Tailwind CSS 4
- App Router
- Local structured content in TypeScript files
- Content kept separate from UI with a reusable typed schema

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
  lib/
    bubble.ts
```

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Current starter content: 35 Calc 1 Bubble Cards across Limits, Derivatives, Applications, and Integrals.

Useful checks:

```bash
npm run lint
npm run build
```

## Content model

Bubble Cards live in [`src/content/calc1.ts`](./src/content/calc1.ts) and follow the shared schema in [`src/content/schema.ts`](./src/content/schema.ts).

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

1. Open [`src/content/calc1.ts`](./src/content/calc1.ts).
2. Add another `makeCalcCard(...)` entry with the same schema.
3. Give it a unique `id` and the correct `order`, `unit`, and `chapter`.
4. Keep the copy short, practical, and pattern-first.
5. Every card should feel like: here is the shape, here is when it shows up, here is the move, do not miss this trap.
6. The dashboard, detail pages, study mode, quiz, and memory hooks will pick it up automatically.

## How to add more courses later

The codebase is already organized for future subjects like Calc 2, Calc 3, Linear Algebra, Differential Equations, and proof-heavy courses.

To expand:

1. Create a new content file beside [`src/content/calc1.ts`](./src/content/calc1.ts).
2. Export a new `CourseContent` object using the shared schema.
3. Register it in [`src/lib/bubble.ts`](./src/lib/bubble.ts).
4. Add course-aware navigation or routing when the second course is ready.

The current UI is Calc 1-first, but the content layer is separated from the UI so expansion does not require a rewrite.
