import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";   
import mongoose from "mongoose";      
import cors from "cors";

const app = express();
const server = createServer(app);    

app.use(cors());                      // optional, but usually needed when using APIs

app.get("/home", (req, res) => {
  return res.json({ "hello": "world" });
});

const start = async () => {
  app.listen(8000, () => {
    console.log("Listening to port 8000");
  });
};

start();
