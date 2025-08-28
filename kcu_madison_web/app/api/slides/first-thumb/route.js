// app/api/slides/first-thumb.js
import { google } from "googleapis";
import Project from "@/lib/projectModel";
import connectMongo from "@/lib/db.js";

export const runtime = "nodejs"; // Edge runtime에서 fs 사용 불가

async function fetchImageAsBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`);
  const arrayBuffer = await res.arrayBuffer();
  return { buffer: Buffer.from(arrayBuffer), contentType: res.headers.get("content-type") || "image/png" };
}

export async function GET(req) {
  const { searchParams } = req.nextUrl;
  const pid = searchParams.get("pid");
  if (!pid) return new Response("Missing presentation ID", { status: 400 });

  await connectMongo();

  // Find project by presentation ID
  const project = await Project.findOne({
    presentation: { $regex: pid },
  });
  if (!project) return new Response("Project not found", { status: 404 });

  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON_B64;
  if (!raw) return new Response("Server configuration error", { status: 500 });

  try {
    const credentials = JSON.parse(Buffer.from(raw, "base64").toString("utf-8"));
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: [
        "https://www.googleapis.com/auth/drive.readonly",
        "https://www.googleapis.com/auth/presentations.readonly",
      ],
    });

    const slides = google.slides({ version: "v1", auth });
    const presentationId = project.presentation.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1] || project.presentation;

    const pres = await slides.presentations.get({ presentationId });
    const firstSlideId = pres.data.slides?.[0]?.objectId;
    if (!firstSlideId) return new Response("No slides available", { status: 404 });

    const thumbRes = await slides.presentations.pages.getThumbnail({
      presentationId,
      pageObjectId: firstSlideId,
    });

    const url = thumbRes.data.contentUrl;
    if (!url) return new Response("Thumbnail not available", { status: 404 });

    const { buffer, contentType } = await fetchImageAsBuffer(url);

    // 저장하지 않고 바로 반환
    return new Response(buffer, {
      status: 200,
      headers: { "Content-Type": contentType },
    });

  } catch (err) {
    console.error(`Failed to generate thumbnail from Slides for ${pid}:`, err.message);
    return new Response("Failed to generate thumbnail", { status: 500 });
  }
}
