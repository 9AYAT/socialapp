import {  Types } from "mongoose";
import { IAttachment, IReactions } from "../../../utils";

export class Post{
    userId!:Types.ObjectId;
   content!:string;
    reactions!:IReactions[];
    attachment?:IAttachment[]

}