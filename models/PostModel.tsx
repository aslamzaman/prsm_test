import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    name: String,
   short_name: String       
})

export const PostModel = mongoose.models.Post || mongoose.model("Post", PostSchema);  
