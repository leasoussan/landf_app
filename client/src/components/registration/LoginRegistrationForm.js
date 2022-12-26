import {useState, useeffect, useContext} from 'react';
import {useNavigate,Navigate,  Link} from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AuthContext  } from '../../auth/AuthProvider.js';
import { connect } from 'react-redux';
import { get_token } from '../../redux/actions.js';

const LoginRegistrationForm = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userId, setUserId] = useState('');
    const [first_name, setFirstName] = useState('');
    const [msg, setMsg] = useState('')

    // const {token, setToken} = useContext(AuthContext )
   
    const navigate= useNavigate()
    
    // const required = value => {
    //     if (!value) {
    //       return (
    //         <div className="alert alert-danger" role="alert">
    //           This field is required!
    //         </div>
    //       );
    //     }
    //   };

    const handleClick = async () => {
        console.log("click button check props", props.title);
        if(props.title === 'Login'){

            
            try{
                const response = await axios.post('/login',{
                    email, password
                },{
                    headers:{
                        'Content-type': 'application/json'
                    }
                })
                console.log("line 34 here ", response.data.token);
                // setToken(response.data.token);
                props.get_token(response.data.token) 
                navigate('/', )
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

const mapStateToProps = state  => {
    return {
        store_token: state.token
    }
}

const mapDispatchToProps = (dispatch) => {
        return {
            get_token: (token)=> dispatch(get_token(token))
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegistrationForm)