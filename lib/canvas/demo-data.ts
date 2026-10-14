import { CanvasCourse, CanvasAssignment } from "@/types/canvas";

export const DEMO_UCI_COURSES: CanvasCourse[] = [
  {
    id: 101,
    name: "COMPSCI 161: Design and Analysis of Algorithms",
    course_code: "COMPSCI 161",
    term_name: "Fall Quarter",
    current_score: 92.4,
    current_grade: "A-",
  },
  {
    id: 102,
    name: "INF 133: User Interaction Software",
    course_code: "INF 133",
    term_name: "Fall Quarter",
    current_score: 96.0,
    current_grade: "A",
  },
  {
    id: 103,
    name: "STATS 67: Introduction to Probability & Statistics for CS",
    course_code: "STATS 67",
    term_name: "Fall Quarter",
    current_score: 87.5,
    current_grade: "B+",
  },
  {
    id: 104,
    name: "WRITING 39C: Argument & Research",
    course_code: "WRITING 39C",
    term_name: "Fall Quarter",
    current_score: 89.0,
    current_grade: "B+",
  },
];

const now = Date.now();
const hour = 3600 * 1000;

export const DEMO_UCI_ASSIGNMENTS: CanvasAssignment[] = [
  {
    id: 201,
    course_id: 101,
    name: "Homework 3: Dynamic Programming & Shortest Paths",
    description: "Complete problems 1-4 on LeetCode/Canvas. Provide recurrence relations and time complexity proofs. Submit PDF on Gradescope.",
    due_at: new Date(now + 26 * hour).toISOString(), // Due tomorrow
    points_possible: 100,
    submission_types: ["online_upload"],
    rubric: [
      { id: "r1", description: "Recurrence Relation Correctness", points: 40, ratings: [] },
      { id: "r2", description: "Time & Space Complexity Proofs", points: 30, ratings: [] },
      { id: "r3", description: "Base Cases & Edge Conditions", points: 30, ratings: [] },
    ],
  },
  {
    id: 202,
    course_id: 102,
    name: "Project 2: React Component Library & Accessibility Audit",
    description: "Design accessible modal components compliant with WCAG 2.1 AA standards. Include keyboard navigation and screen reader tags.",
    due_at: new Date(now + 68 * hour).toISOString(), // Due in ~3 days
    points_possible: 150,
    submission_types: ["online_url", "online_upload"],
    rubric: [
      { id: "r1", description: "Keyboard Navigation & Focus Traps", points: 50, ratings: [] },
      { id: "r2", description: "WCAG 2.1 AA Color Contrast", points: 50, ratings: [] },
      { id: "r3", description: "Component Modularity & Code Quality", points: 50, ratings: [] },
    ],
  },
  {
    id: 203,
    course_id: 103,
    name: "Weekly Quiz 4: Central Limit Theorem",
    description: "Timed 20-minute multiple-choice quiz covering sample distributions and standard normal calculations.",
    due_at: new Date(now + 12 * hour).toISOString(), // Due in 12 hours (URGENT)
    points_possible: 20,
    submission_types: ["online_quiz"],
  },
  {
    id: 204,
    course_id: 104,
    name: "Historical Conversations Project: Final Draft",
    description: "Submit 2,500 word research essay analyzing environmental policy in Southern California. Minimum 8 peer-reviewed citations.",
    due_at: new Date(now + 110 * hour).toISOString(), // Due in ~4.5 days
    points_possible: 200,
    submission_types: ["online_upload"],
    rubric: [
      { id: "r1", description: "Thesis Originality & Scholarly Context", points: 60, ratings: [] },
      { id: "r2", description: "Evidence Integration & MLA Citations", points: 70, ratings: [] },
      { id: "r3", description: "Prose Clarity, Transitions, & Revision", points: 70, ratings: [] },
    ],
  },
];
