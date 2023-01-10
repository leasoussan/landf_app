import db from "../config/elephantsql.js"


export const getCategory = (req,res) =>{
    // const {categories} = req.body
   
    db.select('*')
    .from('category')
    .then(rows => {
        res.json(rows)

    })
    .catch(e => {
        console.log("wo de zhuozi you wenti -Cuòwù due bu xi", e);
        res.status(404).json({ msg: "error" })
    })
}
 



export const getSubCat = (req,res) =>{
    db.select('*')
    .from('sub_cat', 'category')
    .fullOuterJoin('category', 'sub_cat.subcat_cat_id' , 'category.cat_id')
    .then(rows => {
        res.json(rows)

    })
    .catch(e => {
        console.log("wo de zhuozi you wenti -Cuòwù due bu xi", e);
        res.status(404).json({ msg: "error" })
    })

}