import mongoose from "mongoose";

const uri:string = `${process.env.DATABASE_URL}`;
export const Connect = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Mongoose Connection Established");
    } catch (err) {
        console.log(`Mongodb connection fail. ${err}`);
    }
}