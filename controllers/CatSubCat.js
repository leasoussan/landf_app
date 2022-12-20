import db from "../config/elephantsql.js"


export const getCategory = (req,res) =>{
    // const {categories} = req.body
    db('category')
    .select('*')
    .then(rows => {
        res.json(rows)
    })
    .catch(e => {
        console.log(e);
        res.status(404).json({ msg: "error" })
    })
    

}


export const getSubCat = (req,res) =>{
    // here i pass the category in the params``
    const {category} = req.params
    db('sub_cat')
    .select('name', 'sub_cat_id')
    .where({cat_id:category})
    .then(rows => {
        res.json(rows)
    })
    .catch(e => {
        console.log(e);
        res.status(404).json({ msg: "error" })
    })
    

}