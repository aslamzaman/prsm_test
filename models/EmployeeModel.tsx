import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    name: String,
   address: String,
   gender_id: { type: mongoose.Schema.Types.ObjectId, ref: "Gender" },
   district_id: String,
   post_id: String,
   join_dt: String,
   mobile: String       
})

export const EmployeeModel = mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);  
