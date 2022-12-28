export const TOKEN = 'TOKEN'
export const ADD_ITEM_LOAD_STORED = 'ADD_ITEM_LOAD_STORED'
export const USER_LOST_LIST ='USER_LOST_LIST'
export const USER_FOUND_LIST = 'USER_FOUND_LIST'
export const GLOBAL_CATEGORIES_LIST = 'GLOBAL_CATEGORIES_LIST'
export const GLOBAL_SUBCAT_LIST = 'GLOBAL_SUBCAT_LIST'


export const get_token =(token)=>{

    return{
        type:TOKEN,
        payload:token
    }
}


export const get_stored_add_item_data =(data)=>{
    return{
        type:ADD_ITEM_LOAD_STORED,
        payload:data
    }
}

export const user_foundList_toStore =(list)=>{
    console.log("FOUND LIST FROM ACTION", list);

    return{
        type:USER_FOUND_LIST,
        payload:list
    }
}

export const user_lostList_toStore =(list)=>{
    console.log("LOST LIST FROM ACTION", list);
    return{
        type:USER_LOST_LIST,
        payload:list
    }
}

export const set_global_categories =(list)=>{
    console.log("GLOBAL CATEGORIES LIST", list);
    return{
        type:GLOBAL_CATEGORIES_LIST,
        payload:list
    }
}


export const set_global_subCat_cat =(list)=>{
    console.log("GLOBAL CATEGORIES SUB CAT OBJECTS LIST", list);
    return{
        type:GLOBAL_SUBCAT_LIST,
        payload:list
    }
}