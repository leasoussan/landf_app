import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useContext, useEffect , useState} from 'react';
import { connect } from 'react-redux';
import { AppContext } from '../App';

const Nav = (props) => {
    const [redirect, setRedirect] = useState('')
    const [user_id, setUserId] = useState('')
    const { token, setToken } = useContext(AppContext)

    const navigate = useNavigate()

    useEffect(()=>{
        try {
            const get_token =  jwt_decode(token);
            const user_id =  get_token.userId;
            console.log("user_id dashborad from token ",user_id);
            setUserId(user_id)
        }
        catch(e){
            console.log(e);
            navigate('/login')
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
        console.log(user_id);
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


const mapStateToProps = state => {
    return {
        token: state.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // store_token: (token)=>{ dispatch(get_token(token))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Nav)
