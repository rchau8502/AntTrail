import { UciResource } from "@/types/uci";

export const UCI_CAMPUS_RESOURCES: UciResource[] = [
  {
    id: "larc-peer-tutoring",
    name: "LARC (Learning & Academic Resource Center)",
    type: "tutoring",
    description: "Small-group peer tutoring sessions and exam reviews for Math, Chemistry, BioSci, and Physics.",
    targetSubjects: ["MATH", "CHEM", "BIO SCI", "PHYSICS", "STATS"],
    location: "Rowland Hall 284",
    url: "https://larc.uci.edu",
    hours: "Mon-Thu 9am-6pm, Fri 9am-3pm",
    tags: ["STEM", "Tutoring", "Exam Prep"],
  },
  {
    id: "cewc-writing-center",
    name: "Center for Excellence in Writing & Communication (Writing Center)",
    type: "writing",
    description: "One-on-one writing consultations for WRITING 39, upper-division essays, resumes, and research papers.",
    targetSubjects: ["WRITING", "HUMANITIES", "HISTORY", "ENGLISH", "ALL"],
    location: "Ayala Science Library 193",
    url: "https://writingcenter.uci.edu",
    hours: "Mon-Fri 9am-5pm (In-person & Zoom)",
    tags: ["Essays", "Writing", "Citations"],
  },
  {
    id: "ics-peer-tutoring",
    name: "ICS Peer Tutoring & Drop-in Labs",
    type: "stem",
    description: "Free drop-in debugging and concept help from undergraduate tutors for ICS 31-46, CS 161, and CS 141.",
    targetSubjects: ["COMPSCI", "ICS", "IN4MATX", "INF", "SWE"],
    location: "Donald Bren Hall (DBH) 1st Floor Labs",
    url: "https://ics.uci.edu/academics/undergraduate-academic-advising/",
    hours: "Mon-Fri 10am-5pm",
    tags: ["Python", "C++", "Java", "Debugging"],
  },
  {
    id: "uci-counseling-center",
    name: "UCI Counseling Center",
    type: "wellness",
    description: "Confidential mental health support, stress management, and walk-in crisis appointments for registered Anteaters.",
    targetSubjects: ["ALL"],
    location: "Student Services 1, Room 202",
    url: "https://counseling.uci.edu",
    hours: "Mon-Fri 8am-5pm (24/7 Phone Support: 949-824-6457)",
    tags: ["Mental Health", "Stress", "Confidential"],
  },
  {
    id: "uci-libraries-study",
    name: "UCI Libraries & Subject Librarians",
    type: "library",
    description: "Reserve group study rooms at Langson / Ayala and connect with research subject librarians for scholarly citations.",
    targetSubjects: ["ALL"],
    location: "Langson Library & Ayala Science Library",
    url: "https://www.lib.uci.edu",
    hours: "Open late during academic weeks",
    tags: ["Study Rooms", "Research", "Quiet Study"],
  },
];

export function findRelevantUciResources(
  courseCodeOrName: string,
  assignmentText: string = ""
): UciResource[] {
  const normalized = (courseCodeOrName + " " + assignmentText).toUpperCase();

  const relevant = UCI_CAMPUS_RESOURCES.filter((res) => {
    if (res.targetSubjects.includes("ALL")) return false; // Put general ones in secondary
    return res.targetSubjects.some((subj) => normalized.includes(subj));
  });

  // Always append general library and wellness support
  const general = UCI_CAMPUS_RESOURCES.filter((r) => r.targetSubjects.includes("ALL"));
  return [...relevant, ...general];
}
