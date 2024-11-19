import dotenv from "dotenv"

import connectDB from "./db/index.js";
dotenv.config({
    path:"./env"
})
/*now change the dev script to this
nodemon -r dotenv/config --experimental-json-modules src/index.js

we are doing this to bring consistency in the code while importing dotenv temporarily until the dotenv package brings the import syntax permanently into it.
*/
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is connected to the port ${process.env.PORT}`)
    })
    })
.catch((error)=>{console.log("Mongo DB connection failed")})












/*
basic approach
import mongoose from "mongoose"
import { DB_NAME } from "./constant";
import express from "express"
const app = express()


;(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error",(err)=>{
            console.log("ERROR",err)
            throw err
        })
        app.listen(`${process.env.PORT}`,()=>{
            console.log(`App is listeining on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log("error",error)
        throw error
    }
})()
*/