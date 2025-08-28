// lib/presentationSlides.js
import mongoose from "mongoose";
import Project from "../lib/projectModel.js";
import connectMongo from "../lib/db.js";
import { google } from "googleapis";

export async function getFirstSlideThumbnailUrl(presentationUrl) {
  const match = presentationUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
  const presentationId = match ? match[1] : presentationUrl;

  if (!presentationId) return null;

  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) {
    console.error("GOOGLE_SERVICE_ACCOUNT_JSON not set");
    return null;
  }

  const credentials = JSON.parse(raw);

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: [
      "https://www.googleapis.com/auth/drive.readonly",
      "https://www.googleapis.com/auth/presentations.readonly",
    ],
  });

  try {
    const slides = google.slides({ version: "v1", auth });
    const pres = await slides.presentations.get({ presentationId });
    const firstSlideId = pres.data.slides?.[0]?.objectId;
    if (!firstSlideId) return null;

    const thumbRes = await slides.presentations.pages.getThumbnail({
      presentationId,
      pageObjectId: firstSlideId,
      thumbnailProperties_mimeType: "PNG",
      thumbnailProperties_thumbnailSize: "LARGE",
    });

    return thumbRes.data.contentUrl || null;
  } catch (err) {
    console.error("Failed to fetch thumbnail for", presentationId, err);
    return null;
  }
}

async function main() {
  await connectMongo();

  const projects = await Project.find({ presentation: { $exists: true, $ne: null } });

  for (const p of projects) {
    console.log(`Processing project: ${p.title}`);
    const thumb = await getFirstSlideThumbnailUrl(p.presentation);
    if (thumb) {
      p.presentationThumb = thumb;
      await p.save();
      console.log("✅ Saved thumbnail for", p.title);
    } else {
      console.log("⚠️ Could not get thumbnail for", p.title);
    }
  }

  mongoose.connection.close();
}

main().catch(console.error);
