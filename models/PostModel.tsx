import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    name: String,
    short_name: String,
})

export const PostTable = mongoose.models.Post || mongoose.model("Post", PostSchema);