import { IUser } from "../../../utils/common/interface";
import { AbstractRepository } from "../../absract.repository";
import { User } from "./user.model";
//provider
export class UserRepository extends AbstractRepository<IUser>{
constructor(){
    super(User)
}
async getAllUser(){
     return await this.model.find()
}
}