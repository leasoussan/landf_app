export const TOKEN = 'TOKEN'
export const ADD_ITEM_LOAD_STORED = 'ADD_ITEM_LOAD_STORED'

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