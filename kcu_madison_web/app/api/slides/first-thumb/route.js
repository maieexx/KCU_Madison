// app/api/slides/first-thumb.js
import { google } from "googleapis";
import Project from "@/lib/projectModel";
import connectMongo from "@/lib/db.js";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs"; // Edge runtime cannot use fs

async function fetchImageAsBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`);
  const arrayBuffer = await res.arrayBuffer();
  return { buffer: Buffer.from(arrayBuffer), contentType: res.headers.get("content-type") };
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const pid = searchParams.get("pid");
  if (!pid) {
    console.error("Missing presentation ID in query");
    return new Response("Missing presentation ID", { status: 400 });
  }

  await connectMongo();

  // Find project by presentation ID
  const project = await Project.findOne({
    presentation: { $in: [pid, `https://docs.google.com/presentation/d/${pid}`] },
  });
  if (!project) {
    console.error(`Project not found for presentation ID: ${pid}`);
    return new Response("Project not found", { status: 404 });
  }

  // If thumbnail already exists, return it
  if (project.presentationThumb) {
    try {
      const { buffer, contentType } = await fetchImageAsBuffer(project.presentationThumb);
      return new Response(buffer, {
        status: 200,
        headers: { "Content-Type": contentType || "image/png" },
      });
    } catch (err) {
      console.error(`Failed to fetch stored thumbnail for ${pid}:`, err.message);
    }
  }

  // Decode base64 service account JSON from .env
  const rawB64 = process.env.GOOGLE_SERVICE_ACCOUNT_JSON_B64;
  if (!rawB64) {
    console.error("GOOGLE_SERVICE_ACCOUNT_JSON_B64 not set");
    return new Response("Server configuration error", { status: 500 });
  }

  let credentials;
  try {
    const decoded = Buffer.from(rawB64, "base64").toString("utf-8");
    credentials = JSON.parse(decoded);
  } catch (err) {
    console.error("Failed to decode/parse service account JSON:", err);
    return new Response("Server configuration error", { status: 500 });
  }

  try {
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

    if (!firstSlideId) {
      console.error(`No slides found in presentation ${pid}`);
      return new Response("No slides available", { status: 404 });
    }

    const thumbRes = await slides.presentations.pages.getThumbnail({
      presentationId,
      pageObjectId: firstSlideId,
      thumbnailProperties: {
        mimeType: "PNG",
        thumbnailSize: "Large",
      },
    });

    const url = thumbRes.data.contentUrl;
    if (!url) {
      console.error(`No thumbnail URL returned for slide ${firstSlideId} in presentation ${pid}`);
      return new Response("Thumbnail not available", { status: 404 });
    }

    const { buffer, contentType } = await fetchImageAsBuffer(url);

    // Save thumbnail URL to project for future use
    project.presentationThumb = url;
    await project.save();

    return new Response(buffer, {
      status: 200,
      headers: { "Content-Type": contentType || "image/png" },
    });
  } catch (err) {
    console.error(`Failed to generate thumbnail from Slides for ${pid}:`, err.message);
    // Fallback to local SVG
    try {
      const fallbackPath = path.join(process.cwd(), "public", "thumb-fallback.svg");
      const data = await fs.readFile(fallbackPath);
      return new Response(data, {
        status: 200,
        headers: { "Content-Type": "image/svg+xml" },
      });
    } catch (fallbackErr) {
      console.error("Failed to read fallback image:", fallbackErr.message);
      return new Response("No image available", { status: 500 });
    }
  }
}
