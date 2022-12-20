import {useState, useeffect, useContext} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AppContext } from '../App.js';
import { addToLocatStorage } from '../helpers/storage.js';


const LoginRegistrationForm = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userId, setUserId] = useState('');
    const [first_name, setFirstName] = useState('');
    const [msg, setMsg] = useState('')

    const {setToken} = useContext(AppContext)

    const navigate= useNavigate()

    const handleClick = async () => {
        if(props.title === 'Login'){
            try{
                const response = await axios.post('/login',{
                    email, password
                },{
                    headers:{
                        'Content-type': 'application/json'
                    }
                })
                setToken(response.data.token);
                addToLocatStorage('user_id', response.data.userId);
                addToLocatStorage('first_name', response.data.first_name )
                navigate('/')
            } catch(e){
                setMsg(e.msg)
            }
        }
        else{
              try{
                const response = await axios.post('/register',{
                    email, password
                },{
                    headers:{
                        'Content-type': 'application/json'
                    }
                })
                // send.json({msg:'Register Succesfull'})
                navigate('/login')
            } catch(e){
                console.log(e.response.data)
                setMsg(e.response.data.msg)
            }
        }
    }

    return(
        <div>
            <div>
                <h3>{props.title} Form </h3>
            </div>
            <Box component={'form'} sx={{ m: 1 }} noValidate autoComplete={'off'}>
                <TextField
                    sx={{ m: 1 }}
                    id='email'
                    label='Enter Email'
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)} />
                
                <TextField
                    sx={{ m: 1 }}
                    id='password'
                    label='Enter Password'
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)} />
            </Box>
            <Button variant='contained' onClick={handleClick}>{props.title}</Button>
            <div>
                {msg}
            </div>
        
        </div>
    )
}

export default LoginRegistrationForm