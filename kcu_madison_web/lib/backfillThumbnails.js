// lib/backfillThumbnails.js
import connectMongo from "./db.js";
import Project from "./projectModel.js";
import { getFirstSlideThumbnailUrl } from "./presentationSlides.js";
import 'dotenv/config';

async function backfillThumbnails() {
  await connectMongo();

  const projects = await Project.find({}).lean();

  for (const project of projects) {
    if (!project.presentation) continue;

    try {
      const thumbUrl = await getFirstSlideThumbnailUrl(project.presentation);
      if (thumbUrl) {
        await Project.updateOne({ _id: project._id }, { presentationThumb: thumbUrl });
        console.log(`Updated thumbnail for project: ${project.title}`);
      } else {
        console.warn(`No thumbnail generated for: ${project.title}`);
      }
    } catch (err) {
      console.error(`Error processing ${project.title}:`, err.message);
    }
  }

  console.log("Backfill complete");
  process.exit(0);
}

backfillThumbnails();
