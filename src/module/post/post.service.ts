import { Request, Response } from "express";
import { PostRepository } from "../../DB";
import { CreatePostDto } from "./post.dto";
import { PostFactoryService } from "./factory";
import { NotAuthorized, NotconflictException } from "../../utils";
import { Types } from "mongoose";
import { addReactionProvider } from "../../utils/common/provider/react.provider";
class PostService{
   private readonly postRepository=new PostRepository();
   private readonly postFactoryService=new PostFactoryService();
    constructor(){ }
    public create=async(req:Request,res:Response)=>{
        //get data
const createPostDto:CreatePostDto=req.body
//if (!req.user) {
   // return res.status(401).json({
   //     message: "Unauthorized"
   // });
//}
  const post=this.postFactoryService.createPost(createPostDto,req.user!)
const createdPost=await this.postRepository.create(post)
return res.status(201).json({message:"post created successfully",success:true,data:{createdPost}})
  }
//add reaction
public addReaction=async(req:Request,res:Response)=>{
//get data
const{id}=req.params as { id: string };
const{reaction}=req.body;
const userId=req.user?._id
 if (!userId) {
        throw new NotAuthorized("User not authenticated");
    }
//check post exisy
await addReactionProvider(this.postRepository,id,userId,reaction)
   return res.sendStatus(204)
}
//get specific post
public getSpecificPost=async(req:Request,res:Response)=>{
//get data 
const{id}=req.params;
//check eixst
const post=await this.postRepository.getOne({_id:new Types.ObjectId(id as string)}
  //{_id:id}
  ,{},{
  populate:[{path:"userId",select:"fullName firstName lastName"},
    {path:"reactions.userId",select:"fullName firstName lastName"},
    {path:"comments",match:{parentIds:null}}
  ]
})
if(!post) throw new NotAuthorized("post not found")
  return res.status(200).json({message:"done",success:true,data:{post}})
    }

    //delete post
    public deletePost=async(req:Request,res:Response)=>{
      const {id}=req.params;
const postExist=await this.postRepository.exist({_id:new Types.ObjectId(id as string)})
  //{_id:id}) 
if(!postExist)throw new NotAuthorized("post not found");
//delete from db
await this.postRepository.delete({_id:new Types.ObjectId(id as string)})
//send res
return res.status(200).json({
  message:"post deleted successfully",
  success:true
})
    }
  }
export default new PostService()