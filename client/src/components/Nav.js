import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useContext, useEffect , useState} from 'react';

import { AppContext } from '../App';

const Nav = (props) => {
    const [redirect, setRedirect] = useState(false)
    const { token, setToken } = useContext(AppContext)
    console.log(token);
    const navigate = useNavigate()
    // const get_token = jwt_decode(token)
    const user_id = 6


    useEffect(() => {
        const verify = async () => {
            try {
                const response = await axios.get('/token')
                setToken(response.data.token)
                setRedirect(true)
            } catch (e) {
                console.log(e);
                setToken(null)
                navigate('/login')
            }
        }
        verify()
    }, [])

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
                <Button component={Link} to={`/dashboard/${user_id}`}>Dashboard</Button>
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
