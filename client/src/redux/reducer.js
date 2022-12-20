import { USER_ID } from "./actions.js"
import { getFromLocalStorage , addToLocatStorage} from "../helpers/storage.js"


const initState = {
    user_id:getFromLocalStorage('user_id'),
}



export const reducer = (state=initState, action={}) =>{
    switch (action.type){
        case USER_ID:
            return action.payload
    }
}