import mongoose from "mongoose"
import { devConfig } from "../config/env/dev.env";
export const connectDB=async()=>{
await mongoose.connect(devConfig.DB_URL as string).then(()=>{
    console.log("db connected successfully");
}).catch((err)=>{
console.log("fail.connect to db",err)
})
}