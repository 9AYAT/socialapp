import { model } from "mongoose";
import { IUser } from "../../../utils";
import { userSchema } from "./user.schema";
//import { IUser } from "../../../utils/common/interface";
export const User=model<IUser>('User',userSchema)