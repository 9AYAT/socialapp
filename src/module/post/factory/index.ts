import { IUser } from "../../../utils";
import { Post } from "../entity";
import { CreatePostDto } from "../post.dto";

export class PostFactoryService{
    createPost(createPostDto:CreatePostDto,user:IUser){
        const newPost=new Post();
        newPost.userId=user._id;
        newPost.content=createPostDto.content;
        newPost.attachment=[];
        newPost.reactions=[];
        return newPost;
    }
}