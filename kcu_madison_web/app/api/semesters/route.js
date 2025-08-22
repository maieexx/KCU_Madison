import { NextResponse } from "next/server";
import mongoose from "mongoose";
import projectModel from "../../../lib/projectModel";

const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  if (!MONGODB_URI) throw new Error("MONGODB_URI is not set");
  await mongoose.connect(MONGODB_URI);
}

function sortSemestersChrono(arr) {
  const seasonOrder = { Spring: 1, Fall: 2 };
  return arr.slice().sort((a, b) => {
    const [yearA, seasonA] = String(a).split(" ");
    const [yearB, seasonB] = String(b).split(" ");
    if (yearA !== yearB) return Number(yearA) - Number(yearB);
    return (seasonOrder[seasonA] || 9) - (seasonOrder[seasonB] || 9);
  });
}

export async function GET() {
  try {
    await connectDB();

    const semesters = await projectModel.distinct("semester");

    // If nothing found, return empty array
    if (!semesters || semesters.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    const sorted = sortSemestersChrono(semesters);
    return NextResponse.json(sorted);
  } catch (error) {
    console.error("GET /api/semesters error:", error);
    return NextResponse.json({ error: "Failed to fetch semesters" }, { status: 500 });
  }
}
