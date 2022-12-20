import axios from 'axios'
import {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App.js';

export const Auth = (props) => {
    const [redirect, setRedirect] = useState(false)
    const {token, setToken} = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(()=>{

        const verify = async() => {
            try{
                const response = await axios.get('/token')
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