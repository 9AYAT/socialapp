import { ObjectId, Types } from "mongoose";
import { IAttachment, IReactions } from "../../../utils";

export class Comment{
     userId!: Types.ObjectId;
    postId!: Types.ObjectId;

    parentId!: Types.ObjectId | null;
    content!: string;
    attachment?: IAttachment[];

    reactions!: IReactions[];

    mentions?: Types.ObjectId[];


}