import mongoose from "mongoose"
import dns from "node:dns/promises";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

export const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI )
        console.log("Mongo DB Connected")
    } catch (error) {
        console.log("error connect to MongoDB", error);
        process.exit(1);
    }
}