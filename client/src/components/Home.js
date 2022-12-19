import {useContext, useState, useEffect} from 'react';
import jwt_decode from 'jwt-decode';
import { navigate, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { Button } from '@mui/material';
import FoundItemForm from './FoundItemForm.js'

const Home = (props) => {
    
    // const {token, setToken} = useContext(AppContext)
    
    // const navigate = useNavigate()
        
    // useEffect (() => {
    //    try{
    //     console.log(token);
    //     const decode = jwt_decode(token);
    //     const expire = decode.exp;
    //     if(expire * 1000 < new Date().getTime()){
    //         navigate('/login')
    //     }

    //    }
    //    catch(e){
    //     console.log(e);
    //     setToken(null)
    //     navigate('/login')
    //    }

    // },[token])

    const handleAddFound = (e)=>{
        e.preventDefault();
        console.log(e);
        
    }

    const handleAddLost = (e)=>{
        e.preventDefault();
        console.log(e);
    }

    return(
        <div>
            <h1>Home</h1>

            <Button id="found_item_btn" variant="contained" onClick={handleAddFound}>FOUND Something</Button>
            <Button id="lost_item_btn" variant="contained" onClick={handleAddLost}>LOST Something</Button>
<FoundItemForm/>
            
        </div>
    )
}

export default Home