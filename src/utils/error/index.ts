export class AppError extends Error{
    constructor(message:string,public statusCode:number,public errDetails?:Record<string,any>[]){
        super(message);
    }
}
export class ConflictException extends AppError{
    constructor(message:string, errDetails?:Record<string,any>[])
        {
            
        super(message,409,errDetails)
    }
}
export class NotconflictException extends AppError{
    constructor(message:string, errDetails?:Record<string,any>[]){
        super(message,404,errDetails)
    }
}
export class NotAuthorized extends AppError{
    constructor(message:string, errDetails?:Record<string,any>[]){
        super(message,401,errDetails)
    }
}
export class BadRequestException extends AppError{
    constructor(message:string,errDetails?:Record<string,any>[]){
        super(message,400,errDetails)
    }
}
export class ForbiddenException extends AppError{
    constructor(message:string,errDetails?:Record<string,any>[]){
        super(message,403,errDetails)
    }
}