import { Model, MongooseUpdateQueryOptions, ProjectionType, QueryFilter, QueryOptions, UpdateQuery } from "mongoose";
export abstract class AbstractRepository<T>{//not constant ىغ indyamy DIRECT 
    constructor(protected model:Model<T>){}
 async create(item:Partial<T>){
 const doc= new  this.model(item);
 return await doc.save();
}
async exist(filter:QueryFilter<T>,
    projection?:ProjectionType<T>
    ,options?:QueryOptions<T>){
    return await this.model.findOne(filter,projection,options)
}
async getOne(filter:QueryFilter<T>,
    projection?:ProjectionType<T>
    ,options?:QueryOptions<T>){//populate
    return await this.model.findOne(filter,projection,options)
}
async update(filter:QueryFilter<T>,update:UpdateQuery<T>,options?:MongooseUpdateQueryOptions){
   return await this.model.updateOne(filter,update,options)
}
async delete(filter:QueryFilter<T>){
    return await this.model.deleteOne(filter)
}

}