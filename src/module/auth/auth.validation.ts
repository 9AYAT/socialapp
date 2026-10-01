import {z} from "zod";
import { RegisterDto } from "./auth.dto";
import { GENDER } from "../../utils";
export const registerSchema=z.object<RegisterDto>({
fullName:z.string().max(20).min(10)as unknown as string,
email:z.email().optional()as unknown as string,
password:z.string()as unknown as string,
    phoneNumber:z.string()as unknown as string ,
    gender:z.enum(GENDER) as unknown as GENDER,
})