import { UserRepository } from "../../../DB"
import { BadRequestException, NotconflictException } from "../../../utils"
import { VerifyAccountDto } from "../auth.dto"
export const authProvider={
   async checkOTP(verifyAccountDto:VerifyAccountDto){
        const userRepository=new UserRepository()
        const userExist=await userRepository.exist({email:verifyAccountDto.email})
        if(!userExist)
         throw new NotconflictException("user not found")
        //check otp
        if(userExist.otp!=verifyAccountDto.otp)
         throw new BadRequestException("invalid otp")
           if (!userExist.otpExpiryAt) {
            throw new BadRequestException("OTP expiry not found");}
         //  if (!userExist.otpExpiryAt) {
          //  throw new BadRequestException("OTP expiry not found");
       /// }
        //otp expiry
             if(userExist.otpExpiryAt < new Date()){
               throw  new BadRequestException("expired")
             }},
             
}