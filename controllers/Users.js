
import bcrypt from 'bcrypt';
import db from '../config/elephantsql.js';
import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import { json } from 'express';


export const getUsers = async (req,res) =>{
    try{
        const users = await db('users')
        .leftOuterJoin('profile', 'users.id', 'profile.user_id')
        .select('email','password', 'id', 'profile_id')
        .returning('*')
        res.json(users)
    }
    catch(e){
        console.log(e);
        res.status(404).json({msg:'not found'})    }
}




export const register = async(req, res) => {

    const {email, password } = req.body

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password,  salt)
   
    try{
    db('users')
      .select('email')
      .where({ email: email })
      .then(rows => {
          if (!rows.length === 0) {
              console.log("email allready ini ");
          } else {
                  // console.log("user",first_name, last_name, username, email, password, city, dob, created_on, last_login );
                  db('users')
                      .insert({
                          email: email,
                          password: hash,  
                      })
                      .returning('*')
                      .then(rows => {
                          res.json(rows)
                          console.log(rows);
                      })
                      .catch(e => {
                          console.log(e);
                          res.status(404).json({ msg: e.messgae })
                      })                  
              }             
          })
      .catch(e => {
          console.log(e);
      res.status(404).json({ msg: e.message })
      })
    }
    catch(e){
        res.status(404).json({msg:"notGood"})
        }}



export const createProfile = async(req, res) => {

    const {user_id ,last_name,first_name,phone,city,profile_pic, is_center } = req.body

    try{
    db('users')
        .select('id')
        .where({ id: user_id })
        .then(rows => {
            if (!rows.length === 0) {
                console.log("you are not registered yet  ");
            } else {
                    
                    // console.log("user",first_name, last_name, username, email, password, city, dob, created_on, last_login );
                    db('profile')
                        .insert({
                            user_id: user_id,
                            last_name:last_name,
                            first_name:first_name,
                            phone:phone,
                            city:city,
                            profile_pic:profile_pic, 
                            is_center:is_center 
                        })
                        .returning('*')
                        .then(rows => {
                            res.json(rows)
                            console.log(rows);
                        })
                        .catch(e => {
                            console.log(e);
                            res.status(404).json({ msg: e.messgae })
                        })                  
                }             
            })
        .catch(e => {
            console.log(e);
        res.status(404).json({ msg: e.message })
        })
    }
    catch(e){
        res.status(404).json({msg:"notGood"})
        }}

        // test postman
        // {
        //     "user_id": "1" ,
        //     "last_name":"sou",
        //     "first_name":"san",
        //     "phone":"0585421",
        //     "city":"tlv",
        //     "profile_pic":"kjgadsjksdf", 
        //     "is_center": "false" 
           
        //     }

export const login = async (req, res) => {
    const { email, password} = req.body;
  
    try{
        const user = await db('users')
        .leftOuterJoin('profile', 'users.id', 'profile.user_id')
        .where({email:req.body.email})
        .select('email','password', 'id', 'first_name')
        
        const match = await bcrypt.compare(req.body.password, user[0].password)
        if(!match) return res.status(400).json({msg:'Wrong password'});
        const userId = user[0].id;
        const email = user[0].email;
        const first_name = user[0].first_name;

        const token = jwt.sign({userId, email, first_name}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn : '1h'
                });
        
        res.cookie('accessToken', token,{
            httpOnly:true,
            maxAge: 30*60 * 1000
        });
        res.json({token:token});



    }
    catch(e){ 
        console.log(e);
        res.status(404).json({msg:"eror msg "})

    }
        
}




export const logout = (req, res) => {
    //to get the cookie obj
    const accessToken= req.cookies.accessToken;
    if(!accessToken) return res.status(204).json({msg:'cleared'})
    res.clearCookie('accessToken');
    res.status(200).json({msg:'cleared'})
}




export const token = (req,res) => {

  const accessToken = req.cookies.accessToken || req.headers['x-access-token'];

  const decode = jwt_decode(accessToken);
  console.log("ya here ", decode.userId, decode.email, decode.first_name);

  const token = jwt.sign({userId:decode.userId,email:decode.email}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '30m'
  });

  res.cookie('accessToken',token, {
    httpOnly: true,
    maxAge: 1000*60*30 
  });

  res.status(200).json({token:accessToken})
}
