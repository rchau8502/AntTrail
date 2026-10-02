import { CanvasCourse, CanvasAssignment } from "@/types/canvas";

export async function fetchCanvasCourses(
  token: string,
  host = "canvas.eee.uci.edu"
): Promise<CanvasCourse[]> {
  const res = await fetch("/api/canvas/courses?enrollment_state=active&include[]=total_scores&include[]=term", {
    headers: {
      Authorization: `Bearer ${token}`,
      "x-canvas-host": host,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch Canvas courses (${res.status}): ${errorText}`);
  }

  const raw = await res.json();
  return raw
    .filter((c: any) => c.name && !c.access_restricted_by_date)
    .map((c: any) => ({
      id: c.id,
      name: c.name,
      course_code: c.course_code || c.name,
      term_name: c.term?.name,
      current_score: c.enrollments?.[0]?.computed_current_score,
      current_grade: c.enrollments?.[0]?.computed_current_grade,
    }));
}

export async function fetchCanvasAssignments(
  courseId: number,
  token: string,
  host = "canvas.eee.uci.edu"
): Promise<CanvasAssignment[]> {
  const res = await fetch(`/api/canvas/courses/${courseId}/assignments?include[]=rubric&per_page=50`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "x-canvas-host": host,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch assignments for course ${courseId}`);
  }

  const raw = await res.json();
  return raw.map((a: any) => ({
    id: a.id,
    course_id: a.course_id,
    name: a.name,
    description: a.description || "",
    due_at: a.due_at,
    points_possible: a.points_possible || 0,
    submission_types: a.submission_types || [],
    rubric: a.rubric?.map((r: any) => ({
      id: String(r.id),
      description: r.description,
      points: r.points,
      ratings: r.ratings || [],
    })),
    has_submitted_submissions: a.has_submitted_submissions || false,
  }));
}
