import mongoose, { Model } from "mongoose"

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
//const { DATABASE_URL } = process.env

// connection function
export const connect = async () => {
    const conn = await mongoose
        // .connect(DATABASE_URL as string)
        .connect('mongodb+srv://aslam:aslam2014@cluster0.aoj7q.mongodb.net/wgi?retryWrites=true&w=majority')
        .catch(err => console.log(err))
    console.log("Mongoose Connection Established")

    // OUR Post SCHEMA
    const PostSchema = new mongoose.Schema({
        name: String,
        short_name: String,
    })

    // OUR TODO MODEL
    const Post = mongoose.models.Post || mongoose.model("Post", PostSchema)

    return { conn, Post }
}