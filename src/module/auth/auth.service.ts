
import type { NextFunction,Request,Response } from "express"
import { compareHah, ConflictException, ForbiddenException } from "../../utils"
import { LoginDto, RegisterDto, VerifyAccountDto } from "./auth.dto"
import { UserRepository } from "../../DB"
import { AuthFactoryService } from "./factory";
import { authProvider } from "./provider/auth.provider";
import { off } from "node:cluster";
import { generateToken } from "../../utils/token";
import { sendMail } from "../../utils/email";

class AuthService{
   //private dbUserService=new DBService<IUser>(User);
  // private dbPostService=new DBService<IUser>(User);
  private readonly userRepository=new UserRepository();
  private readonly authFactoryService=new AuthFactoryService();
    constructor(){}
      public register=async (req:Request,res:Response,next:NextFunction)=>{//arrow fun
             //get data 
             const registerDto:RegisterDto=req.body
             //check user exist
             const userExist=await this.userRepository.exist({email:registerDto.email})
             if(userExist){
                throw new ConflictException('user already exist')
             }
             //prepare data>>user document>>hasj>encryption>otp>translation
             
            const user= await this.authFactoryService.register(registerDto)
             //save to db
            const createdUser=await this.userRepository.create(user)
            //send email
           // send response
           return res.status(201).json({message:"user creatted success",
            success:true,
           // data:{id:createdUser._id}
           data:{createdUser}
             })
            }
            verifyAccount=async(req:Request,res:Response)=>{
        const verifyAccountDto:VerifyAccountDto=req.body
        //check user exist
        await authProvider.checkOTP(verifyAccountDto)
       await this.userRepository.update({email:verifyAccountDto.email},{
         isVerified:true,$unset:{otp:"",otpExpiryAt:""}
        })
        return res.sendStatus(204)//no content  done
            }
     login=async(req:Request,res:Response)=>{
//get data
const loginDto:LoginDto=req.body
//check user exist 
const userExist=await this.userRepository.exist({email:loginDto.email})
if(!userExist){
   throw new ForbiddenException("invalidcredential")
}
//check password
if(!(await compareHah(loginDto.password,userExist.password))){
   throw new ForbiddenException("invalidcredential")
}
//generate token
const accessToken=generateToken({
   payload:{_id:userExist._id,role:userExist.role},
   options:{expiresIn:"1d"}
})
return res.status(200).json({message:"login successfull",success:true,data:{accessToken}})
}
 }
export default new AuthService();//single tone