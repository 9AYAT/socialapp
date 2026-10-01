import { NextFunction, Request, Response } from "express"
import { verifyToken } from "../utils/token";
import { UserRepository } from "../DB";
import { BadRequestException } from "../utils";
import { Types } from "mongoose";
export const isAuthenticated=()=>{
return async(req:Request,res:Response,next:NextFunction)=>{
const token=req.headers.authorization as  string;
const payload=verifyToken(token);
const userRepository=new UserRepository();
const user=await userRepository.exist({_id: new Types.ObjectId(payload._id)})
if(!user)throw new BadRequestException("user not found")
req.user=user
next()
}

}