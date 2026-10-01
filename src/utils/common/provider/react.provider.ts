import { Types } from "mongoose";
import { CommentRepository, PostRepository } from "../../../DB";
import { NotconflictException } from "../../error";

export const addReactionProvider=async(repo:CommentRepository|PostRepository,
    id:string,userId:Types.ObjectId,
    reaction:string
)=>{
    const postExist=await repo.exist({_id:id })
      //{_id:id}) 
    if(!postExist)throw new NotconflictException("post not found");
    let userreact=postExist.reactions.findIndex((reaction)=>{
      return reaction.userId.toString()==userId?.toString()//object
    })
    if(userreact==-1){
      await repo.update
    ({_id:id }
      //{_id:id}
      ,{$push:{
      reactions:{
        reaction,userId
      }}})}
    
      
    else if([undefined,null,""].includes(reaction)){
     // await this.postRepository.update({_id:id}),
      await repo.update({_id:id},

        //{_id:id},
       {$pull:{reactions:postExist.reactions[userreact]
       }}
    );  }
    //else {
     // await this.postRepository.update({_id:id,"reactions.userId":userId.toString()},{
       // $set: {
    //"reactions.$.reaction":reaction}
     // })
    //}
    else {
        await repo.update(
            //{_id:new Types.ObjectId(id as string)},
          { _id: id },
            {
                $set: {
                    [`reactions.${userreact}.reaction`]: reaction
                }
            }
        );
    }
       //return res.sendStatus(204)
}