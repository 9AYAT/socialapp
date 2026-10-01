import { IComment, IPost, IUser } from "../../../utils";
import { CreateCommentDto } from "../comment.dto";
import { Comment } from "../entity";

export class CommentFactoryService{
    createComment(createeCommentDto:CreateCommentDto,user:IUser,post:IPost,comment?:IComment){
        const newComment=new Comment();
      //  const parentIds=comment.parentIds;
        newComment.content=createeCommentDto.content;
        newComment.userId=user._id;
        newComment.postId=post?._id ||comment?.postId;
        //newComment.parentIds=comment?[...comment.parentIds,comment._id]:[];
        newComment.parentId=comment?._id ??null;
      //  newComment.parentIds.push(comment._id);
     newComment.reactions=[]
         return newComment;
    }
}