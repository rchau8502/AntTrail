export type UciResourceType = "tutoring" | "writing" | "stem" | "wellness" | "library";

export interface UciResource {
  id: string;
  name: string;
  type: UciResourceType;
  description: string;
  targetSubjects: string[]; // e.g. ["COMPSCI", "INF", "MATH", "WRITING", "ALL"]
  location: string;
  url: string;
  hours: string;
  tags: string[];
}
