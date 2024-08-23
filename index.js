import 'dotenv/config'
import {connectDB} from "./src/db/connection.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/userRoute.js";
import postRouter from './src/routes/postRoute.js';


// DB_NAME for a collections in Db =>
const DB_NAME = "alumini-portal";
const PORT = process.env.PORT || 4000;

// connecting mongo-db =>
const mongoDB_uri = `${process.env.MONGODB_URI}/${DB_NAME}`

connectDB(mongoDB_uri)
.then(() => {
    app.listen(PORT , ()=>{
        console.log(`Server started at http://localhost:${PORT}`);
    })
})
.catch((err) => {
    console.log(`connection failed : ${err}`);
});

const app = express();


// middlewares =>
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({  }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes =>
app.get('/' , (req,res) => {
    res.send("Welcome to Homepage!");
})

app.use('/user' , userRouter);
app.use('/post' , postRouter );

export default app;
