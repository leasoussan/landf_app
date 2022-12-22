import express from "express";
import db from "../config/elephantsql.js";
import { add_item, 
    getFoundItemPool, 
    getLostItemPool ,
    getUserLostItem,
    getUserFoundItem,
    item_detail
} from "../controllers/Item.js";
// import CheckItemMatch from "../controllers/CheckItemMatch.js";
const item_router = express.Router();


// CRUD ITEMS FOUND
// CREAT ONE GOAL
item_router.post('/add_item', add_item)
item_router.get('/item_detail/:id', item_detail)



// EDIT 
// / Update - Put - Update/Modify a product
item_router.put('/edit_item/:id', )
item_router.get('/found_item_list/:user_id', getUserFoundItem)
item_router.get('/lost_item_list/:user_id', getUserLostItem)

item_router.get('/found_item_pool/:user_id/:category_id/:sub_cat_id/:found_date/:location/', getFoundItemPool)
item_router.get('/lost_item_pool/:user_id/:category_id/:sub_cat_id/:found_date/:location/', getLostItemPool)

// item_router.get('/search_found_item_db/:lostItem', CheckItemMatch)



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