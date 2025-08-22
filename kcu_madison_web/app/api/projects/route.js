// app/api/projects/route.js
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import projectModel from "@/lib/projectModel";

const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  if (!MONGODB_URI) throw new Error("MONGODB_URI is not set");
  await mongoose.connect(MONGODB_URI);
}

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const semester = searchParams.get("semester");

    if (!semester) {
      // return all projects if no semester filter wanted
      const all = await projectModel.find({}).lean();
      return NextResponse.json({ projects: all });
    }

    // Case-insensitive exact match
    const projects = await projectModel
      .find({ semester: { $regex: `^${semester}$`, $options: "i" } })
      .lean();

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}