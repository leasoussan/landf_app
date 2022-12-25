export const TOKEN = 'TOKEN'
export const ADD_ITEM_LOAD_STORED = 'ADD_ITEM_LOAD_STORED'
export const USER_LOST_LIST ='USER_LOST_LIST'
export const USER_FOUND_LIST = 'USER_FOUND_LIST'
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
    return{
        type:USER_FOUND_LIST,
        payload:list
    }
}

export const user_lostList_toStore =(list)=>{
    return{
        type:USER_LOST_LIST,
        payload:list
    }
}