export interface CanvasCourse {
  id: number;
  name: string;
  course_code: string;
  enrollment_term_id?: number;
  term_name?: string;
  current_score?: number;
  current_grade?: string;
  concluded?: boolean;
  start_at?: string | null;
  end_at?: string | null;
}

export interface CanvasRubricRating {
  id: string;
  description: string;
  points: number;
}

export interface CanvasRubricCriterion {
  id: string;
  description: string;
  points: number;
  ratings: CanvasRubricRating[];
}

export interface CanvasAssignment {
  id: number;
  course_id: number;
  name: string;
  description: string;
  due_at: string | null;
  points_possible: number;
  submission_types: string[];
  rubric?: CanvasRubricCriterion[];
  has_submitted_submissions?: boolean;
  workflow_state?: string;
}
