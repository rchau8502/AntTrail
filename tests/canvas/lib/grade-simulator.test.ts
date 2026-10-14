import { describe, it, expect } from "vitest";
import {
  calculateQuarterWeek,
  calculateWhatIfGrade,
  getLetterGrade,
} from "@/lib/grade-simulator";
import { CanvasAssignment } from "@/types/canvas";

describe("Grade Simulator & Quarter Pace", () => {
  it("converts percentage into letter grades accurately", () => {
    expect(getLetterGrade(94)).toBe("A");
    expect(getLetterGrade(88)).toBe("B+");
    expect(getLetterGrade(72)).toBe("C-");
    expect(getLetterGrade(55)).toBe("F");
  });

  it("calculates what-if grade correctly with simulated scores", () => {
    const assignments: CanvasAssignment[] = [
      { id: 1, course_id: 10, name: "HW1", description: "", due_at: null, points_possible: 100, submission_types: [] },
      { id: 2, course_id: 10, name: "HW2", description: "", due_at: null, points_possible: 100, submission_types: [] },
    ];
    // HW1 scored 90, HW2 simulated 80
    const whatIfScores = { 1: 90, 2: 80 };
    const result = calculateWhatIfGrade(assignments, whatIfScores);
    expect(result.totalPoints).toBe(200);
    expect(result.earnedPoints).toBe(170);
    expect(result.percentage).toBe(85);
    expect(result.letterGrade).toBe("B");
  });

  it("computes quarter week within 1 to 11", () => {
    const week = calculateQuarterWeek(new Date());
    expect(week).toBeGreaterThanOrEqual(1);
    expect(week).toBeLessThanOrEqual(11);
  });
});
