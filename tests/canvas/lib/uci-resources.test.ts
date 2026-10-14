import { describe, it, expect } from "vitest";
import { findRelevantUciResources, UCI_CAMPUS_RESOURCES } from "@/lib/uci-resources";

describe("UCI Campus Resource Matcher", () => {
  it("includes LARC tutoring and ICS labs in directory", () => {
    expect(UCI_CAMPUS_RESOURCES.some((r) => r.name.includes("LARC"))).toBe(true);
    expect(UCI_CAMPUS_RESOURCES.some((r) => r.name.includes("Writing Center"))).toBe(true);
  });

  it("matches ICS tutoring for COMPSCI courses", () => {
    const matches = findRelevantUciResources("COMPSCI 161", "Algorithm design");
    expect(matches.some((r) => r.id === "ics-peer-tutoring")).toBe(true);
  });

  it("matches Writing Center for Writing or Essay courses", () => {
    const matches = findRelevantUciResources("WRITING 39C", "Research paper draft");
    expect(matches.some((r) => r.id === "cewc-writing-center")).toBe(true);
  });
});
