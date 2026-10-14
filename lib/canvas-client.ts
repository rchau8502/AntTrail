import { CanvasCourse, CanvasAssignment } from "@/types/canvas";

export async function fetchCanvasCourses(
  token: string,
  host = "canvas.eee.uci.edu"
): Promise<CanvasCourse[]> {
  const res = await fetch(
    "/api/canvas/courses?enrollment_state=active&include[]=total_scores&include[]=term&include[]=concluded&per_page=50",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "x-canvas-host": host,
      },
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch Canvas courses (${res.status}): ${errorText}`);
  }

  const raw = await res.json();
  const now = Date.now();
  const thirtyDaysMs = 30 * 24 * 3600 * 1000;

  return raw
    .filter((c: any) => {
      if (!c.name || c.access_restricted_by_date) return false;
      // Filter out concluded courses
      if (c.concluded) return false;
      // Filter out courses that ended over 30 days ago
      if (c.end_at && new Date(c.end_at).getTime() < now - thirtyDaysMs) return false;
      if (c.term?.end_at && new Date(c.term.end_at).getTime() < now - thirtyDaysMs) return false;
      return true;
    })
    .map((c: any) => ({
      id: c.id,
      name: c.name,
      course_code: c.course_code || c.name,
      term_name: c.term?.name,
      current_score: c.enrollments?.[0]?.computed_current_score,
      current_grade: c.enrollments?.[0]?.computed_current_grade,
      concluded: c.concluded || false,
      start_at: c.start_at,
      end_at: c.end_at,
    }));
}

export async function fetchCanvasAssignments(
  courseId: number,
  token: string,
  host = "canvas.eee.uci.edu"
): Promise<CanvasAssignment[]> {
  const res = await fetch(
    `/api/canvas/courses/${courseId}/assignments?include[]=rubric&include[]=submission&per_page=100&order_by=due_at`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "x-canvas-host": host,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch assignments for course ${courseId}`);
  }

  const raw = await res.json();
  return raw.map((a: any) => {
    const isSubmitted =
      a.has_submitted_submissions ||
      (a.submission && a.submission.workflow_state !== "unsubmitted" && a.submission.workflow_state != null);

    return {
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
      has_submitted_submissions: Boolean(isSubmitted),
      workflow_state: a.workflow_state,
    };
  });
}
