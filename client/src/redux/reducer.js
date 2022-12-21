import { TOKEN, ADD_ITEM_LOAD_STORED } from "./actions.js"
import { getFromLocalStorage , addToLocatStorage} from "../helpers/storage.js"


const initState = {
    token :'',
    add_item_load:[]
}



export const reducer = (state=initState, action={}) =>{
    switch (action.type){
        case TOKEN:
            console.log(...state);
            console.log(action.payload);
            return {...state, token:action.payload}
        
        case ADD_ITEM_LOAD_STORED:
            return {...state, add_item_load:action.payload}
        default:
            return {...state}    
    }   
}