import { CanvasAssignment } from "@/types/canvas";

export function getLetterGrade(percentage: number): string {
  if (percentage >= 93) return "A";
  if (percentage >= 90) return "A-";
  if (percentage >= 87) return "B+";
  if (percentage >= 83) return "B";
  if (percentage >= 80) return "B-";
  if (percentage >= 77) return "C+";
  if (percentage >= 73) return "C";
  if (percentage >= 70) return "C-";
  if (percentage >= 67) return "D+";
  if (percentage >= 60) return "D";
  return "F";
}

export function calculateWhatIfGrade(
  assignments: CanvasAssignment[],
  whatIfScores: Record<number, number>
): { totalPoints: number; earnedPoints: number; percentage: number; letterGrade: string } {
  let totalPossible = 0;
  let totalEarned = 0;

  for (const a of assignments) {
    if (a.points_possible <= 0) continue;
    totalPossible += a.points_possible;
    const score = whatIfScores[a.id] !== undefined ? whatIfScores[a.id] : a.points_possible * 0.85; // default estimate
    totalEarned += Math.max(0, Math.min(score, a.points_possible));
  }

  const percentage = totalPossible > 0 ? Math.round((totalEarned / totalPossible) * 1000) / 10 : 100;
  return {
    totalPoints: totalPossible,
    earnedPoints: Math.round(totalEarned * 10) / 10,
    percentage,
    letterGrade: getLetterGrade(percentage),
  };
}

export function calculateQuarterWeek(now: Date = new Date()): number {
  // Approximate standard UCI 10-week cycle + Finals week
  // Month 8/9/10/11 = Fall, 0/1/2 = Winter, 3/4/5 = Spring
  const month = now.getMonth(); // 0-indexed
  let startMonth = 8; // Sep (Fall)
  if (month >= 0 && month <= 2) startMonth = 0; // Jan (Winter)
  else if (month >= 3 && month <= 5) startMonth = 3; // Apr (Spring)

  const quarterStartDate = new Date(now.getFullYear(), startMonth, 25);
  const diffTime = now.getTime() - quarterStartDate.getTime();
  const diffDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
  const weekNumber = Math.floor(diffDays / 7) + 1;

  return Math.min(Math.max(weekNumber, 1), 11);
}
