import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET() {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    const semesters = await ProjectModel.distinct("semester");
    return NextResponse.json(semesters);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch semesters" },
      { status: 500 }
    );
  }
}
