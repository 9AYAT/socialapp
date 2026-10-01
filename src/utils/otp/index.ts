//export const generateOTP=():string=>{
    //return Math.floor(Math.random()*99999+10000) as unknown as string
//}
//export const generateExpiryDate=(time:number)=>{
   // return Date.now()+time;
//}
export const generateOtp = (): string => {
    return Math.floor(10000 + Math.random() * 90000).toString();
};

export const generateExpiryDate = (time: number): Date => {
    return new Date(Date.now() + time);
};