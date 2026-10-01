import { model } from "mongoose";
import { postSchema } from "./post.schema";
import { IPost } from "../../../utils";

export const Post=model<IPost>("Post",postSchema)