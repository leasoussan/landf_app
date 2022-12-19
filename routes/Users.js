import express from 'express';
import bcrypt from 'bcrypt'
import { register, createProfile, login, logout, token, getUsers } from '../controllers/Users.js';
import { VerifyToken } from '../middleware/VerifyToken.js';
import db from '../config/elephantsql.js';
const router = express.Router();

router.post('/register', register);
router.post('/create_profile/', createProfile);
router.delete('/logout', logout);
router.post('/login', login);
router.get('/users', getUsers )
router.get('/token',  VerifyToken, token);
export default router

