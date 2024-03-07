import mongoose, { Schema } from "mongoose";

interface IPost {
  name: String;
  shortname: String;
}

const PostSchema = new Schema<IPost>(
  {
    name: String,
    shortname: String
  },
  {
    timestamps: true
  }
);

export const PostModel = mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);  
