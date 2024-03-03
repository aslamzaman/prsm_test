import mongoose from "mongoose";

const GenderSchema = new mongoose.Schema({
    name: String       
})

export const GenderModel = mongoose.models.Gender || mongoose.model("Gender", GenderSchema);  
