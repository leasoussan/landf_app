import { TOKEN, ADD_ITEM_LOAD_STORED , USER_LOST_LIST, USER_FOUND_LIST} from "./actions.js"
import { getFromLocalStorage, addToLocatStorage } from "../helpers/storage.js"


const initState = {
    token: '',
    add_item_load: [],
    user_lost_items: [],
    user_found_item: []
}



export const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case TOKEN:
            console.log("reducer",action.payload);
            return { ...state, token: action.payload }

        case ADD_ITEM_LOAD_STORED:
            return { ...state, add_item_load: action.payload }
       
        case USER_FOUND_LIST:
            return { ...state, user_found_items: action.payload }
        
        case USER_LOST_LIST:
            return { ...state, user_lost_items: action.payload }

        default:
            return { ...state }
    }
}