import {config} from "dotenv";
config()
export const devConfig={
 DB_URL:process.env.DB_URL,
PORT:process.env.PORT,
EMAIL:process.env.EMAIL,
PASSWORD:process.env.PASSWORD,
JWT_SECRET:process.env.JWT_SECRET
}