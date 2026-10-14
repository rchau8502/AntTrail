import { CanvasAssignment } from "@/types/canvas";
import { AssignmentMilestone } from "@/types/study";

export function generateMilestonesForAssignment(
  assignment: CanvasAssignment,
  existingMilestones: AssignmentMilestone[] = []
): AssignmentMilestone[] {
  if (existingMilestones && existingMilestones.length > 0) {
    return existingMilestones;
  }

  const name = assignment.name.toLowerCase();
  const desc = (assignment.description || "").toLowerCase();
  const isCoding =
    name.includes("lab") ||
    name.includes("project") ||
    name.includes("code") ||
    desc.includes("github") ||
    desc.includes("gradescope") ||
    desc.includes("algorithm");
  const isWriting =
    name.includes("essay") ||
    name.includes("paper") ||
    name.includes("draft") ||
    name.includes("writing");

  const milestones: AssignmentMilestone[] = [];

  // Phase 1: Understand
  milestones.push({
    id: `${assignment.id}-m1`,
    title: "Review Prompt & Submission Formats",
    phase: "understand",
    description: `Read assignment details (${assignment.points_possible} pts). Check required formats: ${
      assignment.submission_types.join(", ") || "Canvas upload"
    }.`,
    completed: false,
  });

  // Phase 2: Draft & Outline
  if (isCoding) {
    milestones.push({
      id: `${assignment.id}-m2`,
      title: "Architecture & Starter Environment",
      phase: "draft",
      description: "Set up local repository/files, create test harness, and design algorithm edge cases.",
      completed: false,
    });
  } else if (isWriting) {
    milestones.push({
      id: `${assignment.id}-m2`,
      title: "Outline Arguments & Collect Sources",
      phase: "draft",
      description: "Create section outline, gather primary and secondary scholarly citations.",
      completed: false,
    });
  } else {
    milestones.push({
      id: `${assignment.id}-m2`,
      title: "Gather Course Notes & Resources",
      phase: "draft",
      description: "Review relevant lecture slides, textbook readings, and discussion worksheets.",
      completed: false,
    });
  }

  // Phase 3: Core Execution (Include Rubric if available)
  if (assignment.rubric && assignment.rubric.length > 0) {
    for (let i = 0; i < Math.min(assignment.rubric.length, 3); i++) {
      const criterion = assignment.rubric[i];
      milestones.push({
        id: `${assignment.id}-rubric-${i}`,
        phase: "execute",
        title: `Deliverable: ${criterion.description.slice(0, 40)}`,
        description: `Targeting all ${criterion.points} pts for criterion: "${criterion.description}".`,
        completed: false,
      });
    }
  } else {
    milestones.push({
      id: `${assignment.id}-m3`,
      title: isCoding ? "Implement Core Functionality" : "Execute Deliverable Draft",
      phase: "execute",
      description: isCoding
        ? "Write core logic, data structures, and handle normal/boundary inputs."
        : "Complete initial full draft according to prompt requirements.",
      completed: false,
    });
  }

  // Phase 4: Review & Verification
  milestones.push({
    id: `${assignment.id}-m4`,
    title: "Final Verification & Canvas Submission",
    phase: "review",
    description: "Self-check against rubric criteria, confirm clean file export, and verify submission confirmation on Canvas.",
    completed: false,
  });

  return milestones;
}
