import { NextFunction, Request, Response, type Express } from "express";
import { connectDB } from "./DB";
import { AppError } from "./utils";
import { authRouter, commentRouter, postRouter } from "./module";
export function bootstrap(app:Express,express:any){
 connectDB()
app.use(express.json());
//auth
app.use("/auth",authRouter)
//app.use("/user",userRouter)
app.use("/post",postRouter)
app.use("/comment",commentRouter)
app.use("/{*dummy}",(req,res,next)=>{
    return res.status(404).json({message:'invalid router',success:false});
})
app.use((err:AppError,req:Request,res:Response,next:NextFunction)=>{
    return res.status(err?.statusCode??500).json({message:err?.message,success:false,errDetails:err?.errDetails})
})
}
