import { CanvasAssignment } from "./canvas";

export type UrgencyQuadrant = "do_first" | "schedule" | "delegate_or_quick" | "backlog";

export interface PrioritizedAssignment {
  assignment: CanvasAssignment;
  courseName: string;
  priorityScore: number;
  estimatedHours: number;
  hoursUntilDue: number | null;
  quadrant: UrgencyQuadrant;
  isOverdue: boolean;
}

export interface DailyWorkload {
  dateString: string; // YYYY-MM-DD
  dayLabel: string;   // e.g., "Wed Oct 4"
  estimatedHours: number;
  assignmentCount: number;
  isBurnoutRisk: boolean; // > 6.0 hours
}

export interface AssignmentMilestone {
  id: string;
  title: string;
  phase: "understand" | "draft" | "execute" | "review";
  description: string;
  completed: boolean;
  isCustom?: boolean;
}
