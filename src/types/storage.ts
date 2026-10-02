import { CanvasCourse, CanvasAssignment } from "./canvas";
import { AssignmentMilestone } from "./study";

export interface FocusSessionLog {
  id: string;
  assignmentId?: number;
  courseId?: number;
  durationMinutes: number;
  timestamp: string;
}

export interface ZotCanvasStorage {
  canvas_token: string | null;
  canvas_host: string;
  gemini_api_key: string | null;
  is_demo_mode: boolean;
  has_agreed_disclaimer: boolean;
  cached_courses: CanvasCourse[];
  cached_assignments: CanvasAssignment[];
  assignment_milestones: Record<number, AssignmentMilestone[]>; // assignmentId -> milestones
  focus_sessions: FocusSessionLog[];
  what_if_grades: Record<number, number>; // assignmentId -> simulated score
  completed_assignment_ids: number[]; // student marked completed assignments
  hidden_course_ids: number[]; // student hidden (e.g. past quarter) courses
}
