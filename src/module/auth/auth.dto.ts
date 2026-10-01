import { GENDER } from "../../utils/common/enum";

export interface RegisterDto{
    fullName?:string,
    email:string,
    password:string,
    phoneNumber?:string,
    gender:GENDER,
}
export interface VerifyAccountDto{
      email:string,
      otp:string
}
export interface LoginDto{
    email:string,
    password:string
}