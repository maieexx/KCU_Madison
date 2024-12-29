import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true,
    },
    teamMember: {
        type: Array,
        required: true,
    },
    photo: {
        type: Array,
        required: true,
    },
    demoVideo: {
        type: String,
        required: true,
        option: nullable,
    },
    projectName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    github_link: {
        type: String,
        required: true,
        option: nullable,
    },
});

export default mongoose.models.test_db || mongoose.model("test_db", ItemSchema);
