import express from 'express';
import bcrypt from 'bcrypt'
import { VerifyToken } from '../middleware/VerifyToken.js';
import db from '../config/elephantsql.js';
import {add_item_content,item_content_detail, edit_item_content, delet_item_content } from '../controllers/ItemContent.js'
const item_content = express.Router();

item_content.post('/item_content', VerifyToken,add_item_content );
item_content.get('/item_content_detail/:id', item_content_detail );
item_content.put('/edit_item_content/:id', VerifyToken,edit_item_content )
item_content.delete('/delet_item_content/:id', VerifyToken,delet_item_content );

export default item_content

