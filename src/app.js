import express, { urlencoded } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({extended:true,limit:"20kb"}))
app.use(express.static("public"))  //images, favicon and other static files
app.use(cookieParser())


// import routes
import userRouter from "./routes/user.routes.js"


// declaring routes
app.use("/api/v1/users",userRouter)

export default app