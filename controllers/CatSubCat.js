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
 
    // TODOD# 
    //   .leftOuterJoin('sub_cat', 'category.cat_id', 'sub_cat.cat_id')
//   .select('category.cat_id','category.name', 'sub_cat.sub_cat_id', 'sub_cat.name')
// coment faire un full join sur les 2 table 



export const getSubCat = (req,res) =>{
    console.log("in subcar", req.params);
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