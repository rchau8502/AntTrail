import { NextRequest, NextResponse } from "next/server";

const DEFAULT_CANVAS_HOST = "canvas.eee.uci.edu";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Missing Canvas authorization token in Authorization header." },
      { status: 401 }
    );
  }

  const canvasHost = req.headers.get("x-canvas-host") || DEFAULT_CANVAS_HOST;
  const queryString = req.nextUrl.search;
  const targetUrl = `https://${canvasHost}/api/v1/${path.join("/")}${queryString}`;

  try {
    const canvasRes = await fetch(targetUrl, {
      method: "GET",
      headers: {
        Authorization: authHeader,
        Accept: "application/json",
      },
    });

    const data = await canvasRes.text();
    return new NextResponse(data, {
      status: canvasRes.status,
      headers: {
        "Content-Type": canvasRes.headers.get("content-Type") || "application/json",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown network error";
    return NextResponse.json(
      { error: `Failed to relay request to Canvas: ${message}` },
      { status: 502 }
    );
  }
}
