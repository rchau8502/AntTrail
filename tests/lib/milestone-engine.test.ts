import { describe, it, expect } from "vitest";
import { generateMilestonesForAssignment } from "@/lib/milestone-engine";
import { CanvasAssignment } from "@/types/canvas";

describe("Milestone Engine", () => {
  it("generates programming-specific milestones for coding assignments", () => {
    const assignment: CanvasAssignment = {
      id: 201,
      course_id: 1,
      name: "ICS 46: Lab 3 Binary Search Trees",
      description: "Submit your bst.cpp and Makefile to Gradescope.",
      due_at: null,
      points_possible: 50,
      submission_types: ["online_upload"],
    };

    const milestones = generateMilestonesForAssignment(assignment);
    expect(milestones.length).toBeGreaterThanOrEqual(4);
    expect(milestones.some((m) => m.phase === "understand")).toBe(true);
    expect(milestones.some((m) => m.phase === "execute")).toBe(true);
    expect(milestones.some((m) => m.title.toLowerCase().includes("core") || m.title.toLowerCase().includes("starter") || m.title.toLowerCase().includes("environment"))).toBe(true);
  });

  it("extracts milestones based on rubric criteria if present", () => {
    const assignment: CanvasAssignment = {
      id: 202,
      course_id: 2,
      name: "Writing 39C Advocacy Essay",
      description: "Write 1500 words on water conservation.",
      due_at: null,
      points_possible: 100,
      submission_types: ["online_upload"],
      rubric: [
        { id: "r1", description: "Thesis Statement & Context", points: 25, ratings: [] },
        { id: "r2", description: "Scholarly Evidence & Citations", points: 35, ratings: [] },
      ],
    };

    const milestones = generateMilestonesForAssignment(assignment);
    expect(milestones.some((m) => m.description.includes("Thesis Statement"))).toBe(true);
  });
});
