import express from "express";
import {createServer} from "node:http";

import {Server} from "socker.io";

import mongoose from " mongoose";

import cors from "cors";

const app = express();
const sever=createServer(app);

app.get("/home",(req,res)=>{
    return res.json({"hello":"world"});
})