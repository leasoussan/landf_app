import jwt from 'jsonwebtoken';
import { getUsers } from '../controllers/Users.js';
import db from '../config/elephantsql.js'; 

 export const VerifyToken = (req,res, next) =>{
    const accessToken = req.cookies.accessToken || req.headers['x-access-token'];
    if (!accessToken) return res.status(401).json({msg:'Permission Denied'})

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async(err, decode)=>{
        if(err) return res.status(403).json({msg:"Token Verification Failed"})
        try{
            const user = await db('users')
            .leftOuterJoin('profile', 'users.id', 'profile.user_id')
            .where({email:decode.email})
            
            next();
        }
        catch (e){
            res.status(403).json({msg:"user verification Failed"})
        }
    })
 }