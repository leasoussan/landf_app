import express from 'express';
import bcrypt from 'bcrypt'
import { VerifyToken } from '../middleware/VerifyToken.js';
import db from '../config/elephantsql.js';
import { add_suggestion, suggestion_detail } from '../controllers/Suggestions.js';

const suggestion_router = express.Router();

suggestion_router.post('/add_suggestion', add_suggestion);
suggestion_router.delete('/');
suggestion_router.get('/suggestion_detail', suggestion_detail)
suggestion_router.put('/');

export default suggestion_router

