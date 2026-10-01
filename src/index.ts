import express from "express";
import { bootstrap } from "./app.controller";
import{config} from "dotenv";
config();
const app =express();
bootstrap(app,express)
const port=3000;
app.listen(port,()=>{
console.log("server is running on",port)
})