import db from "../config/elephantsql.js"


export const getCategory = (req,res) =>{
    const {categories} = req.body
    db('category')
    .select('*')
    .returning('*')
    .then(rows => {
        res.json(rows)
    })
    .catch(e => {
        console.log(e);
        res.status(404).json({ msg: "error" })
    })
    

}


export const getSubCat = (req,res) =>{
    const {category} = req.body
    db('sub_cat')
    .select('name', 'sub_cat_id')
    .where({cat_id:category})
    .returning('*')
    .then(rows => {
        res.json(rows)
    })
    .catch(e => {
        console.log(e);
        res.status(404).json({ msg: "error" })
    })
    

}