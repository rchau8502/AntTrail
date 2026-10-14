export const difficulties = ["Starter", "Standard", "Stretch"] as const;

export type Difficulty = (typeof difficulties)[number];
export type Unit = string;

export interface QuickExample {
  problem: string;
  move: string;
}

export interface MiniDrillItem {
  prompt: string;
  answer: string;
}

export interface BubbleCard {
  id: string;
  subject: string;
  course: string;
  courseCode?: string;
  chapter: string;
  unit: Unit;
  topic: string;
  name: string;
  order: number;
  useItWhen: string;
  whatItMeans?: string;
  looksLike: string;
  doThis: string;
  whyThisMove?: string;
  thinkOfItAs: string;
  watchOutFor: string;
  rememberThis: string;
  quickExample?: QuickExample;
  typicalProblemShapes: string[];
  miniDrill: MiniDrillItem[];
  memoryHook: string;
  tags: string[];
  aliases?: string[];
  difficulty: Difficulty;
}

export interface CourseContent {
  id: string;
  subject: string;
  title: string;
  institution?: string;
  courseCodes?: string[];
  aliases?: string[];
  shortDescription: string;
  units: string[];
  chapters: string[];
  cards: BubbleCard[];
}

export type LocalizedCardContent = Pick<
  BubbleCard,
  | "course"
  | "chapter"
  | "unit"
  | "topic"
  | "name"
  | "useItWhen"
  | "whatItMeans"
  | "looksLike"
  | "doThis"
  | "whyThisMove"
  | "thinkOfItAs"
  | "watchOutFor"
  | "rememberThis"
  | "quickExample"
  | "typicalProblemShapes"
  | "miniDrill"
  | "memoryHook"
>;

export type LocalizedCourseText = Pick<CourseContent, "title" | "shortDescription" | "units" | "chapters">;
