// import axios from 'axios'
import axios from "./axios.js";

import {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext  } from './AuthProvider.js';

export const Auth = (props) => {
    const [redirect, setRedirect] = useState(false)
    // const {token, setToken} = useContext(AuthContext )
    const navigate = useNavigate()

    useEffect(()=>{
        
        const verify = async() => {
            try{
                const response = await axios.get('/token')
                // setToken(response.data.token)
                setRedirect(true)
            }catch(e){
                // setToken(null)
                navigate('/login')
            }
        }
        verify()
    },[])

    return(
        redirect ? props.children : null
    )
}



// ------------------
// import axios from "./axios.js";

// class AuthApi {

//   static Login = (data) => {
//     return axios.post(`users/login`, data);
//   };

//   // don't forget to add the register and logout methods
// }

// export default AuthApi;