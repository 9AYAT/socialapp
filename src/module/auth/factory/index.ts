import { SYS_ROLE, USER_AGENT } from "../../../utils/common/enum";
import { generateHash } from "../../../utils/hash";
import { generateExpiryDate, generateOtp } from "../../../utils/otp";
import { RegisterDto } from "../auth.dto";
import { User } from "../entity";
export class AuthFactoryService{
   async register(registerDto:RegisterDto){
const user=new User();
user.fullName=registerDto.fullName as string;
user.email=registerDto.email;
user.password=await generateHash(registerDto.password);
user.phoneNumber=registerDto.phoneNumber as string;//encrypt
user.otp=generateOtp();
user.otpExpiryAt=generateExpiryDate(8*60*1000) ;//as unknown as Date  ;
user.credentialUpdateAt=Date.now() as unknown as Date;
user.gender=registerDto.gender;
user.role=SYS_ROLE.user;
user.userAgent=USER_AGENT.local
user.isVerified=false
return user;
    }
}