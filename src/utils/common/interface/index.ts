import {  Types } from "mongoose";
import { GENDER, REACTION, SYS_ROLE, USER_AGENT } from "../enum";

export interface IUser{
   // _id: ObjectId,
   _id: Types.ObjectId,
    firstName:string,
    lastName:string,
    fullName?:string,
    email:string,
    password:string,
    credentialUpdateAt:Date,
    phoneNumber?:string,
    role:SYS_ROLE,
    gender:GENDER,
    userAgent:USER_AGENT,
    otp?:string,
    otpExpiryAt?:Date,
    isVerified:boolean
}
declare module "express"{
        interface Request{
        user?:IUser
    }
}
declare module "jsonwebtoken"{
    interface JwtPayload{
        _id:string,
    role:string
    }
}
export interface IAttachment{
    url:string,
    id:string
}
export interface IReactions{
reaction:REACTION,
userId:Types.ObjectId
}
export interface IPost{
   _id: Types.ObjectId,
    userId:Types.ObjectId,
    content:string,
    reactions:IReactions[],
    attachment:IAttachment[]
}
export interface IComment{
    _id: Types.ObjectId;
    userId:Types.ObjectId;
    postId:Types.ObjectId;
    // parentIds:Types.ObjectId[]
    parentId:Types.ObjectId | null;
    content:string;
   attachment:IAttachment[];
   reactions:IReactions[];
   mentions?:Types.ObjectId[];

}