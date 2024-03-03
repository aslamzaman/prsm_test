import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    name: String,
    address: String,
    contact: String,
    join_date: String,
    show_in_dues: String,
    createdAt: String,
    updatedAt: String
})

export const CustomerModel = mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);

