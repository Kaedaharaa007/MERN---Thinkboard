import express from "express"; //package.json type = "module" 
import dotenv from "dotenv";
import cors from "cors";
import path from "path"

// const express = require("express"); //doesn't need type in package.json
import notesRoutes from"./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

//Request → CORS run -> express.json → rateLimiter → notesRoutes → Response

dotenv.config(); //everytime we use env variable use dotenv.config

const app = express();
const PORT = process.env.PORT || 5001; //|| means if we cant get the variable, acsess 5001
const __dirname = path.resolve()

//nodemon -> !!MUST IN DEVELOPMENT!!
//watch and update every single changes (no need to start server every changes)
//node -> for deployment website

//middle ware, dont forget next()
//allow frontend request to accsess api in backend
if(process.env.NODE_ENV !== "production"){
    app.use(cors({
        origin:"http://localhost:5173",
    }))
}

app.use(express.json());//parse our JSON bodies: req.body
app.use(rateLimiter);
//simple custom middleware
// app.use((req,res,next)=>{
//     console.log(`Req method is ${req.method} and Req url is ${req.url}`);
//     next();
// })

//if there is api, direct to notesRoutes
app.use("/api/notes", notesRoutes);
//backend serve our optimized react folder (dist)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    app.use((req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}

//connect to mongoDB, our database
connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log("Server started on port", PORT);
    })
})
