import { TOKEN, 
    ADD_ITEM_LOAD_STORED , 
    USER_LOST_LIST, 
    USER_FOUND_LIST,
    GLOBAL_CATEGORIES_LIST,
    GLOBAL_SUBCAT_LIST
} from "./actions.js";

import { getFromLocalStorage, addToLocatStorage } from "../helpers/storage.js"


const initState = {
    token: '',
    add_item_load: [],
    user_found_item: [],
    user_found_item: [],
    global_categories:[],
    global_sub_cat_per_cat:[],
    
}



export const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case TOKEN:
            console.log("reducer",action.payload);
            // return { ...state.token, token: action.payload }
            return { ...state.token, token: action.payload }

        case ADD_ITEM_LOAD_STORED:
            return { ...state, add_item_load: action.payload }
       
        case USER_FOUND_LIST:
            return { ...state, user_found_items: action.payload }
            // return { ...state.user_found_item, user_found_items: action.payload }

        case USER_LOST_LIST:
            return { ...state, user_lost_items: action.payload }


        case GLOBAL_CATEGORIES_LIST:
            console.log("reducer GLOBAL_CATEGORIES_LIST",action.payload);

            return { ...state, global_categories: action.payload }
        case GLOBAL_SUBCAT_LIST:
            console.log("reducer GLOBAL_SUB___CAT_LIST",action.payload);

            return { ...state, global_sub_cat_per_cat: action.payload }

        default:
            return { ...state }
    }
}