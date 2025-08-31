import { Schema, Document, models, model, Types } from "mongoose";

export interface IProject extends Document {
  _id: Types.ObjectId;
  semester: string;
  isWinner: boolean;
  teamName: string;
  teamMembers: string[];
  presentation: string;
  presentationThumb?: string | null;
  title: string;
  description: string;
  languages: string[];
  github?: string | null;
}

const projectSchema = new Schema<IProject>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    semester: { type: String, required: true },
    isWinner: { type: Boolean, default: false },
    teamName: { type: String, required: true },
    teamMembers: { type: [String], required: true },
    presentation: { type: String, required: true },
    presentationThumb: { type: String, default: null },
    title: { type: String, required: true },
    description: { type: String, required: true },
    languages: { type: [String], required: true },
    github: { type: String, default: null },
  },
  { timestamps: true }
);

const Project =
  models.Project || model<IProject>("Project", projectSchema);

export default Project;