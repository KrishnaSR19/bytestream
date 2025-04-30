import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";   
import mongoose from "mongoose";      
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
// import {connectToSocket} from "./src/controllers/socketmanager"
import userRoutes from "./src/routes/userroute.js"

const app = express();
const server = createServer(app);
const io = new Server(server, );    


app.use(cors());                      // optional, but usually needed when using APIs
app.set("port",(process.env.PORT || 8000));
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));


app.use("/api/v1/users",userRoutes);




// app.get("/home", (req, res) => {
//   return res.json({ "hello": "world" });
// });



const start = async () => {
  app.set("mongo_user")
  const connectionDb = await mongoose.connect(process.env.MONGO_URL);

  console.log(`Mongo connected DB Host: ${connectionDb.connection.host}`);


  server.listen(app.get("port"), () => {
    console.log("Listening to port 8000");
  });
};

start();
