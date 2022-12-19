import express from "express";
import db from "../config/elephantsql.js";
import { getCategory, getSubCat } from "../controllers/CatSubCat.js";

const back_end_router = express.Router()


back_end_router.get('/category' , getCategory);
back_end_router.get('/sub_cat' ,getSubCat );

export default back_end_router