import { NextFunction, Request, Response } from "express"
import { ZodType } from "zod"
import { BadRequestException } from "../utils/error"

export const isValid=(schema:ZodType)=>{
return (req:Request,res:Response,next:NextFunction)=>{
let data={...req.body,...req.params,...req.query}
const result=schema.safeParse(data);
if(result.success==false){
    let errMessage=result.error.issues.map((issue)=>({
        path:issue.path[0],
        message:issue.message
    }))
             throw new BadRequestException("validation error",errMessage)
}
next()
}}