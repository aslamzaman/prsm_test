import mongoose from "mongoose";

export const Connect = async (): Promise<void> => {
	try {
		const MONGODB_URI:string = `${process.env.DATABASE_URL}`;
		const connection = await mongoose.connect(MONGODB_URI);
		console.log('MongoDB connected:', connection.connection.host);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
}