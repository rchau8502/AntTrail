import { CanvasAssignment } from "@/types/canvas";
import { PrioritizedAssignment, UrgencyQuadrant, DailyWorkload } from "@/types/study";

export function estimateAssignmentHours(assignment: CanvasAssignment): number {
  const text = (assignment.name + " " + assignment.description).toLowerCase();
  let baseHours = 1.5;

  if (text.includes("project") || text.includes("programming") || text.includes("lab")) {
    baseHours = 5.0;
  } else if (text.includes("essay") || text.includes("paper") || text.includes("write")) {
    baseHours = 4.0;
  } else if (text.includes("quiz") || text.includes("survey") || text.includes("reading check")) {
    baseHours = 0.5;
  } else if (text.includes("homework") || text.includes("problem set") || text.includes("hw")) {
    baseHours = 3.0;
  }

  // Adjust by points weight
  if (assignment.points_possible >= 100) {
    baseHours = Math.max(baseHours, 4.0);
  } else if (assignment.points_possible <= 10) {
    baseHours = Math.min(baseHours, 1.0);
  }

  return Math.round(baseHours * 10) / 10;
}

export function calculatePriorityScore(
  assignment: CanvasAssignment,
  hoursUntilDue: number | null
): number {
  if (hoursUntilDue === null) return 10; // No due date = low priority

  // If ancient overdue (> 72 hours in the past), it is past quarter / archived; do NOT panic
  if (hoursUntilDue < -72) {
    return 5;
  }

  // If recently overdue (0 to -72 hours), keep high catch-up priority
  if (hoursUntilDue < 0) {
    return 85;
  }

  // Weight point factor (up to 40 pts)
  const pointsFactor = Math.min(assignment.points_possible / 100, 1.0) * 40;

  // Urgency factor: decays as hours grow (up to 60 pts)
  const urgencyFactor = (1 / Math.max(hoursUntilDue / 24, 0.2)) * 25;
  const clampedUrgency = Math.min(urgencyFactor, 60);

  return Math.round(pointsFactor + clampedUrgency);
}

export function categorizeAssignment(
  priorityScore: number,
  hoursUntilDue: number | null,
  isOverdue: boolean
): UrgencyQuadrant {
  // If ancient overdue (more than 72 hours ago), assign to backlog
  if (hoursUntilDue !== null && hoursUntilDue < -72) {
    return "backlog";
  }

  // Do Today: due within 36 hours OR recently overdue (0 to -72 hours) or very high score
  if (
    (hoursUntilDue !== null && hoursUntilDue >= -72 && hoursUntilDue <= 36) ||
    priorityScore >= 75
  ) {
    return "do_first";
  }

  if (hoursUntilDue !== null && hoursUntilDue <= 120 && hoursUntilDue > 36) {
    return "schedule";
  }

  if (priorityScore < 30) {
    return "delegate_or_quick";
  }

  return "backlog";
}

export function prioritizeAssignments(
  assignments: CanvasAssignment[],
  courseMap: Record<number, string> = {},
  completedIds: number[] = [],
  hiddenCourseIds: number[] = []
): PrioritizedAssignment[] {
  const now = Date.now();

  // Filter out assignments from hidden courses, submitted assignments, or marked completed
  const activeAssignments = assignments.filter((a) => {
    if (hiddenCourseIds.includes(a.course_id)) return false;
    if (completedIds.includes(a.id)) return false;
    if (a.has_submitted_submissions) return false;
    return true;
  });

  return activeAssignments
    .map((assignment) => {
      let hoursUntilDue: number | null = null;
      let isOverdue = false;

      if (assignment.due_at) {
        const diffMs = new Date(assignment.due_at).getTime() - now;
        hoursUntilDue = Math.round(diffMs / (1000 * 60 * 60));
        isOverdue = diffMs < 0;
      }

      const priorityScore = calculatePriorityScore(assignment, hoursUntilDue);
      const estimatedHours = estimateAssignmentHours(assignment);
      const quadrant = categorizeAssignment(priorityScore, hoursUntilDue, isOverdue);

      return {
        assignment,
        courseName: courseMap[assignment.course_id] || `Course ${assignment.course_id}`,
        priorityScore,
        estimatedHours,
        hoursUntilDue,
        quadrant,
        isOverdue,
      };
    })
    .sort((a, b) => b.priorityScore - a.priorityScore);
}

export function calculateDailyWorkload(
  assignments: CanvasAssignment[],
  completedIds: number[] = [],
  hiddenCourseIds: number[] = []
): DailyWorkload[] {
  const dayBuckets: Record<string, { hours: number; count: number; date: Date }> = {};
  const today = new Date();

  // Initialize next 7 days
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const key = d.toISOString().split("T")[0];
    dayBuckets[key] = { hours: 0, count: 0, date: d };
  }

  // Only consider active, non-completed, non-hidden assignments
  const activeAssignments = assignments.filter((a) => {
    if (hiddenCourseIds.includes(a.course_id)) return false;
    if (completedIds.includes(a.id)) return false;
    if (a.has_submitted_submissions) return false;
    return true;
  });

  for (const a of activeAssignments) {
    if (!a.due_at) continue;
    const dueKey = a.due_at.split("T")[0];
    if (dayBuckets[dueKey]) {
      dayBuckets[dueKey].hours += estimateAssignmentHours(a);
      dayBuckets[dueKey].count += 1;
    }
  }

  return Object.entries(dayBuckets).map(([dateString, info]) => {
    const dayLabel = info.date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    return {
      dateString,
      dayLabel,
      estimatedHours: Math.round(info.hours * 10) / 10,
      assignmentCount: info.count,
      isBurnoutRisk: info.hours >= 6.0,
    };
  });
}
