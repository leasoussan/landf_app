import db from "../config/elephantsql.js";


// CRUD ITEM FOUND
// CREATE ONE GOAL
export const add_item = (req, res) => {

    console.log("here test ", req.body);
    const { name, category_id, sub_category, lat, len, found_date, user_id, note, is_lost, is_found, resolved } = req.body;

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


// ITEM DETAIL

export const item_detail = async (req, res) => {
    console.log("what are ou sayng", req.body);
    const { id } = req.params;
    console.log(id);
    try {
         const getItemDetail = await db('item')
            .where({ id :id })
            .select('*')
         
        res.json(getItemDetail)    
    }
    catch (e) {
        console.log(e);
        res.status(404).json({ msg: e.message })
    }
}




// EDIT ITEM
// / Update - Put - Update/Modify a product
export const edit_item = async (req, res) => {
    console.log("HIIII***********************", req.params);

    const { id } = req.params;
    const { name, category_id, sub_category, note, height, width, weight, color_in, color_out, material, brand } = req.body;
    console.log("req.body", req.body);
    console.log("req.params", req.params);

    try{
        console.log("hou hou *************************", req.params);
       const get_item = await  db('item')
            .where({ id :id })
            .update(req.body)
            .returning('*')
            .then(rows => {
                res.json(rows)
            })
        console.log("______________________________get item ",get_item);
    }
    catch(e){
        console.log(e);
        res.status(404).json({ msg: e.message })
    }

}

export const delet = (req, res) => {

    const { id } = req.params;
    db('item')
        .where({ id:id })
        .del()
        .returning('*')
        .then(rows => {
            res.json(rows)
            console.log(rows);
        })
        .catch(e => {
            res.status(404).json({ msg: 'product not found...' })
        })

}


export const getUserFoundItem = (req, res) => {
    console.log("icic cest req et toi ", req.params);
    const { user_id } = req.params
    db('item')
        .select('*')
        .where({ user_id: user_id, is_found: true })
        .returning('*')
        .then(rows => {
            if (rows.length === 0) {
                res.json({ msg: "null" })
          
            } else {

                res.json(rows)
            }

        })
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: "error" })
        })
}

export const getUserLostItem = (req, res) => {
    console.log("lost stuff user ", req.params);
    const { user_id } = req.params
    db('item')
        .select('*')
        .where({ user_id: user_id, is_lost: true })
        .returning('*')
        .then(rows => {
            if (rows.length === 0) {
                res.json({ msg: "null" })
            } else {

                res.json(rows)
            }

        })
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: "error" })
        })
}

// :user_id/:category_id/:sub_cat_id/:found_date/:location/'
// Getting all the items tha are found and that are not from this user
// checking that it's not the user items, that its not a lot item and that its not resolved 
// WHERE: category / subCategory/ 
export const getFoundItemPool = (req, res) => {
    const { user_id, category_id, sub_cat_id, found_date , location} = req.params
    console.log("icic cest req et toi ", req.params);
    db('item')
        .select('*')
        .whereNot({ user_id: user_id, is_lost: true, resolved: true })
        .where({category_id:category_id, 
            sub_cat_id:sub_cat_id,
            found_date:found_date,
            location:location
        })
        .returning('*')
        .then(rows => {
            if (rows.length === 0) {
                res.json({ msg: "null" })
            } else {

                res.json(rows)
            }

        })
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: "error" })
        })
}

export const getLostItemPool = (req, res) => {
    console.log("lost stuff user ", req.params);
    const { user_id } = req.params
    db('item')
        .select('*')
        .whereNot({ user_id: user_id, is_found: true, resolved: true })
        .returning('*')
        .then(rows => {
            if (rows.length === 0) {
                res.json({ msg: "null" })
                res.send("no items")
            } else {

                res.json(rows)
            }

        })
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: "error" })
        })
}

