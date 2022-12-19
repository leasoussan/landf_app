import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import router from './routes/Users.js';
import item_router from './routes/Item.js';
import back_end_router from './routes/CatSubCat.js'
import db from './config/elephantsql.js';


dotenv.config()

const app = express();
app.use(cors());
app.use(cookieParser());

// express.json- a midleware parser for the req
app.use(express.json()),
app.use(express.urlencoded({extended:true}));

app.use(router);
app.use(item_router);
app.use(back_end_router);


app.listen(process.env.PORT||8080, ()=>{
    console.log(`run on ${process.env.PORT||8088}`)
})

