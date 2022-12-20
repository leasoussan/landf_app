export const USER_ID = 'USER_ID'


export const get_user_id =(id)=>{
    return{
        type:USER_ID,
        payload:id
    }
}