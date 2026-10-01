import { Request, Response } from "express";
import { CommentRepository, PostRepository } from "../../DB";
import { IComment, IPost, NotAuthorized, NotconflictException } from "../../utils";
import { Types } from "mongoose";
import { CommentFactoryService } from "./factory";
import { CreateCommentDto } from "./comment.dto";
import { addReactionProvider } from "../../utils/common/provider/react.provider";
//import { commentRepository } from "../../DB/model/comment/comment.repository";
class CommentService{
    private readonly postRepository=new PostRepository();
    private readonly commentRepository=new CommentRepository();
    private readonly commentFactoryService=new CommentFactoryService()
    public create=async(req:Request,res:Response)=>{
        //get data
        const{id,postId}=req.params;
        const createCommentDto:CreateCommentDto=req.body
         //check post 
 const postExist=await this.postRepository.exist({ _id: new Types.ObjectId(postId as string)})
 //({_id:postId})
 if(!postExist) throw new NotconflictException("post not found")
    //check comment
let commentExist:IComment|any=undefined;
if(id){
    commentExist=await this.commentRepository.exist({_id:id})
    if(!commentExist)throw new NotconflictException("comment not found")
}
//prepare data 
const comment=this.commentFactoryService.createComment(createCommentDto,req.user!,postExist,commentExist)
    //creat into db
   const createdComment= await this.commentRepository.create(comment)
   //send res
   return res.status(201).json({message:"comment created successfully",success:true})
}
//get specific
getSpecific=async(req:Request,res:Response)=>{
//get data
const{id}=req.params
//check
const commenExist=await this.commentRepository.exist({_id:new Types.ObjectId(id as string)},{},{
    populate:[{path:"replies"}]
});
if(!commenExist) throw new NotconflictException("comment not found")
    //send res
return res.status(201).json({message:"comment fetched successfully",success:true,data:{commenExist}})
}
//add reactiob
public addReaction=async(req:Request,res:Response)=>{
//get data
const{id}=req.params as { id: string };
const{reaction}=req.body;
const userId=req.user?._id
 if (!userId) {
        throw new NotAuthorized("User not authenticated");
    }
//check post exisy
await addReactionProvider(this.commentRepository,id,userId,reaction)
   return res.sendStatus(204)
}




//delet comment
public deleteComment=async(req:Request,res:Response)=>{
 const { id } = req.params;
    // check comment
    const commentExist = await this.commentRepository.exist({
        _id: new Types.ObjectId(id as string)
    }
,{},{populate:[{path:"postId",select:"userId"}]});
    if (!commentExist) {
        throw new NotconflictException("comment not found");
    }
    //check user auth
   // if (!req.user) {throw new NotAuthorized("user not authorized");}
if(commentExist.userId.toString()!=req.user?._id.toString()
    &&(commentExist.postId as unknown as IPost).userId.toString()!=req.user?._id.toString())
throw new NotconflictException("comment not found");
    // delete
    await this.commentRepository.delete({
        _id: new Types.ObjectId(id as string)
    });
    // send response
    return res.status(200).json({
        message: "comment deleted successfully",
        success: true
    });
}
}
export default new CommentService();