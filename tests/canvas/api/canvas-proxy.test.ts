import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET } from "@/app/api/canvas/[...path]/route";
import { NextRequest } from "next/server";

describe("Canvas Stateless Relay Route", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns 401 if Authorization header is missing", async () => {
    const req = new NextRequest("http://localhost:3000/api/canvas/courses");
    const res = await GET(req, { params: Promise.resolve({ path: ["courses"] }) });
    expect(res.status).toBe(401);
    const data = await res.json();
    expect(data.error).toContain("Missing Canvas authorization token");
  });

  it("relays request with bearer token to canvas.eee.uci.edu", async () => {
    const mockCanvasResponse = [{ id: 1234, name: "COMPSCI 161" }];
    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify(mockCanvasResponse), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    const req = new NextRequest("http://localhost:3000/api/canvas/courses", {
      headers: {
        Authorization: "Bearer test-uci-token-123",
      },
    });

    const res = await GET(req, { params: Promise.resolve({ path: ["courses"] }) });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toEqual(mockCanvasResponse);

    expect(fetchSpy).toHaveBeenCalledWith(
      "https://canvas.eee.uci.edu/api/v1/courses",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer test-uci-token-123",
        }),
      })
    );
  });
});
