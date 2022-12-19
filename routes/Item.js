import express from "express";
import db from "../config/elephantsql.js";
import { add_item } from "../controllers/Item.js";
const item_router = express.Router();


// CRUD ITEMS FOUND
// CREAT ONE GOAL
item_router.post('/add_found_item/', add_item )



// EDIT GOAL
// / Update - Put - Update/Modify a product
item_router.put('/edit_item/:id', )







export default item_router



// CHECK
// {
//     "name": "new",
//     "category_id": "1",
//     "sub_category": "1",
//     "lat": "3453",
//     "len": "345",
//     "found_date": "2022-12-01", 
//     "user_id": "1",
//     "note": "sdf",
//     "is_lost": "true",
//     "is_found": "fals", 
//     "resolved": "fals",
//     "height": "10",
//     "width": "10",
//     "weight": "10",
//     "color_in": "erd",
//     "color_out": "orangew",
//     "material": "sdf",
//     "brand": "sdf"
//     }