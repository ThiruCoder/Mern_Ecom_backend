import mongoose from "mongoose";



const connectDB = async () => {
    const dbConnect = process.env.MONGO_DB
    try {
        await mongoose.connect(dbConnect);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error : ', error);
        process.exit(1);
    }
}

export default connectDB;