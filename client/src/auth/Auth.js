import axios from 'axios'
import {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';

export const Auth = (props) => {
    console.log("in auth here", AppContext);
    const [redirect, setRedirect] = useState(false)
    const {token, setToken} = useContext(AppContext)
    console.log("token", token);
    const navigate = useNavigate()

    useEffect(()=>{

        const verify = async() => {
            try{
                console.log("entry try ");
                const response = await axios.get('/token')

                console.log(response);
                setToken(response.data.token)
                setRedirect(true)
            }catch(e){
                console.log(e);
                setToken(null)
                navigate('/login')
            }
        }
        verify()
    },[])

    return(
        redirect ? props.children : null
    )
}