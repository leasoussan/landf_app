import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useContext, useEffect , useState} from 'react';

import { AppContext } from '../App';

const Nav = (props) => {
    const [redirect, setRedirect] = useState(false)
    const [navuser_id, setUserId] = useState(false)
    const { token, setToken } = useContext(AppContext)

    const navigate = useNavigate()

    useEffect(()=>{
        try{
            const data = jwt_decode(token)

            console.log("the data ",data.userId);
            setUserId(data.userId)

        }
        catch(e){
            console.log(e);
        }
    },[token])




    const logout = async () => {
        try {
            const response = await axios.delete('/logout')

            if (response.status === 200 || response.status === 204) {

                navigate('/login')
            }
        } catch (e) {
            console.log(e);
            navigate('/login')
        }
    }

    if (token) {
        return (
            <Stack spacing={2} direction='row'>
                <Button component={Link} to={`/dashboard/${navuser_id}`}>Dashboard</Button>
                <Button component={Link} to='/'>Home</Button>
                <Button component={Link} to='/users'>Users</Button>
                <Button onClick={logout}>Logout</Button>

            </Stack>
        )
    }
    else {
        return (
            <Stack spacing={2} direction='row'>  
                <Button component={Link} to='/'>Home</Button>      
                <Button component={Link} to='/login'>Login</Button>
                <Button component={Link} to='/register'>Register</Button>


            </Stack>
        )
    }

}
export default Nav
