{/* Contains Project model and schema */}

import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  semester: { type: String, required: true },
  isWinner: { type: Boolean, default: false },
  teamName: { type: String, required: true },
  teamMembers: { type: [String], required: true },
  presentation: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  languages: { type: [String], required: true },
  github: { type: String, default: null }
});

export default mongoose.models.Project || mongoose.model("Project", projectSchema);