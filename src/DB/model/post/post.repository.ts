import { AbstractRepository } from "../../absract.repository";
import { Post } from "./post.model";
import { IPost } from "../../../utils";

export class PostRepository extends AbstractRepository<IPost>{
constructor(){
    super(Post)
}
}