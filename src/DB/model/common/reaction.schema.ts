import { Schema } from "mongoose";
import { IReactions, REACTION } from "../../../utils";
export const reactionSchema=new Schema<IReactions>({
    reaction:{type:Number,
        enum:REACTION,
        //default:REACTION.like
     set:(value:unknown) => Number(value),
    // required:[true,"null not allowed"]
    },
    userId:{
        type:Schema.Types.ObjectId,
    ref:"User",
    required:true
    }
},{timestamps:true})