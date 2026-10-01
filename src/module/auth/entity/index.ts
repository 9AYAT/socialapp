import { GENDER, SYS_ROLE, USER_AGENT } from "../../../utils/common/enum";

export class User{//instant
      public firstName!:string;
       public lastName!:string;
       public fullName?:string;
        public email!:string;
       public password!:string;
      public  credentialUpdateAt!:Date;
       public phoneNumber?:string;
       public role!:SYS_ROLE;
      public  gender!:GENDER;
       public userAgent!:USER_AGENT;
       public otp?:string;
       public otpExpiryAt?:Date;
       public isVerified!:boolean;
}