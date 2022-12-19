import {Link, useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useContext } from 'react';
import { unstable_composeClasses } from '@mui/material';

const Nav = (props) => {

    const navigate = useNavigate()

    const logout = async() => {
        try{
            const response = await axios.delete('/logout')
            if(response.status === 200 || response.status === 204){
                navigate('/login')
            }
        }catch(e){
            console.log(e);
            navigate('/login')
        }
    }

    return (
        <Stack spacing={2} direction='row'>
            <Button component={Link} to='/'>Home</Button>
            <Button component={Link} to='/users'>Users</Button>
            <Button component={Link} to='/login'>Login</Button>
            <Button component={Link} to='/register'>Register</Button>
            <Button component={Link} to='/dash'>Dashboard</Button>
            <Button onClick={logout}>Logout</Button>

        </Stack>
    )
}
export default Nav