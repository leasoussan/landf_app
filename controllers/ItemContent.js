import db from "../config/elephantsql.js";



// CREATE ONE SUGGESTION
export const add_item_content = (req, res) => {

    console.log("add item content SAVE START  ", req.body);
    const { item_id,category_id, sub_cat, color } = req.body;

    db('item_content')
        .insert(req.body)
        .returning('*')
        .then(rows => {
            console.log('-----------save---item_content',rows);
            res.json(rows)
        })
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: "error" })
        })
}


//  ONE SUGGESTION DETAIL

export const item_content_detail = async (req, res) => {
    console.log("what are ou item_content_detail?? ", req.body);
    const { item_id } = req.params;
    console.log("item_content id - readt item_content detail", item_id);
    try {
         const getItemContent_detail = await db('item_content')
            .where({ item_id :item_id })
            .select('*')
         
        res.json(getItemContent_detail)   

    }
    catch (e) {
        console.log(e);
        res.status(404).json({ msg: e.message })
    }
}



// / Update - Put - Update/Modify a product
export const edit_item_content = async (req, res) => {
    console.log("HIIII******edit_item_content*************", req.params);
    const {id} =req.params
    const {item_id,category_id, sub_cat, color  } = req.body;
    console.log("req.body edit_item_content", req.body);
    console.log("req.params edit_item_content", req.params);

    try{
        console.log("hou hou ******edit_item_content***********", req.params);
       const save_editItem_content = await  db('item_content')
            .where({ id :id })
            .update(req.body)
            .returning('*')
            .then(rows => {
                res.json(rows)
            })
        console.log("________________item_content ",get_item);
    }
    catch(e){
        console.log(e);
        res.status(404).json({ msg: e.message })
    }

}

export const delet_item_content = (req, res) => {
    console.log("in teh item content delete");
    const { id } = req.params;
    db('item_content')
        .where({ id:id })
        .del()
        .returning('*')
        .then(rows => {
            res.json("delet_item_content the selected item content",rows)
        })
        .catch(e => {
            res.status(404).json({ msg: 'product not found...' })
        })

}
