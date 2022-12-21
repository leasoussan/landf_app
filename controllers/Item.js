import db from "../config/elephantsql.js";


// CRUD ITEM FOUND
// CREATE ONE GOAL
export const add_item =(req, res) => {
    console.log("here test ", req.body);
    const {name,category_id,sub_category,lat,len,found_date, user_id,note,is_lost,is_found, resolved} =req.body;
        
    db('item')
        .insert(req.body)
        .returning('*')
        .then(rows => {
            console.log(rows);
            res.json(rows)
        })
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: "error" })
        })
}
// export const found_item = async (req,res)=>{  
//     console.log("are we here yet? ");  
//     try{
//         await Item.create('item',{
//             name:name,
//             sub_category:{
//                 id:sub_category,
//                 category:{
//                     id: category_id,
//                     }
//                 },
            
//             lat:lat,
//             len:len,
//             found_date:found_date,
//             user_id:{
//                 id:user_id
//             },
//             note:note,
//             is_lost,
//             is_found,
//             resolved

//         })
      
//         res.json({msg:"you did it!"})
//     }
//     catch(e){
//         console.log(e);
//         res.status(404).json({msg:'Email already exists'})

//     }
// }



// EDIT ITEM
// / Update - Put - Update/Modify a product
const edit_item = (req, res) => {
    console.log(req.body);
    const { id } = req.params;
    const {name,category_id,sub_category,note,height,width,weight,color_in,color_out,material,brand} =req.body;
    console.log(req.body);
    db('item')
        .where({ id })
        .update(req.body)
        .returning('*')
        .then(rows => {
            res.json(rows)
        })
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: e.messgae })
        })


}




export const getUserFoundItem = (req, res) => {
    console.log("icic cest req et toi ",req.params);
    const {user_id} = req.params
    db('item')
        .select('*')
        .where({user_id: user_id, is_found:true})
        .returning('*')
        .then(rows => {
            if(rows.length === 0) {
                  res.json({msg:"null"})
            }  else{
             
                res.json(rows) 
            }
           
        })
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: "error" })
        })
}

// export const getUsers = async (req,res) =>{
//     console.log("icic cest req et toi ",req.params);
//     console.log("thebody",req.body);
//     try{
//         const users = await db('users')
//         .leftOuterJoin('profile', 'users.id', 'profile.user_id')
//         .select('email','password', 'id', 'profile_id')
//         .returning('*')
//         res.json(users)
//     }
//     catch(e){
//         console.log(e);
//         res.status(404).json({msg:'not found'})    }
// }
