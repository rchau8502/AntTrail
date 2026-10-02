import { describe, it, expect } from "vitest";
import {
  calculatePriorityScore,
  estimateAssignmentHours,
  categorizeAssignment,
  calculateDailyWorkload,
  prioritizeAssignments,
} from "@/lib/priority-engine";
import { CanvasAssignment } from "@/types/canvas";

describe("Priority & Workload Engine", () => {
  const sampleAssignment: CanvasAssignment = {
    id: 101,
    course_id: 1,
    name: "Project 2: Graph Routing",
    description: "Implement Dijkstra algorithm in Python. 100 points.",
    due_at: new Date(Date.now() + 18 * 3600 * 1000).toISOString(), // 18 hours from now
    points_possible: 100,
    submission_types: ["online_upload"],
  };

  it("calculates higher priority score for assignments due within 24 hours", () => {
    const hoursLeft = 18;
    const score = calculatePriorityScore(sampleAssignment, hoursLeft);
    expect(score).toBeGreaterThan(60);
  });

  it("estimates completion hours appropriately based on points and keywords", () => {
    const hours = estimateAssignmentHours(sampleAssignment);
    expect(hours).toBeGreaterThanOrEqual(4); // Programming project with 100 points
  });

  it("categorizes urgent assignment into do_first quadrant", () => {
    const quad = categorizeAssignment(85, 18, false);
    expect(quad).toBe("do_first");
  });

  it("does not categorize ancient overdue assignments (-4000h) into do_first", () => {
    const hoursLeft = -4269; // From user screenshot
    const score = calculatePriorityScore(sampleAssignment, hoursLeft);
    const quad = categorizeAssignment(score, hoursLeft, true);
    expect(quad).not.toBe("do_first");
    expect(quad).toBe("backlog");
  });

  it("filters out completed assignments from prioritizeAssignments", () => {
    const list = prioritizeAssignments([sampleAssignment], { 1: "CS 161" }, [101]);
    expect(list.length).toBe(0);
  });

  it("filters out hidden courses from prioritizeAssignments", () => {
    const list = prioritizeAssignments([sampleAssignment], { 1: "CS 161" }, [], [1]);
    expect(list.length).toBe(0);
  });

  it("flags burnout risk when daily work exceeds 6 hours", () => {
    const assignments: CanvasAssignment[] = [
      { ...sampleAssignment, id: 1, points_possible: 100 },
      { ...sampleAssignment, id: 2, points_possible: 100 },
    ];
    const dailyMap = calculateDailyWorkload(assignments);
    const hasRisk = dailyMap.some((d) => d.isBurnoutRisk);
    expect(hasRisk).toBe(true);
  });
});
