import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const Users = (props) => {
    const [users, setUsers] = useState([])

const navigate = useNavigate()

    useEffect (()=>{
        fetch('/users')
        .then(res => {
            console.log("res.status",res.status);
            if(res.status === 200){
                return res.json()
            }
            else{
                navigate('/login')
            }
        })
        .then(data => {
            setUsers(data)
        })
        .catch(e=>{
            console.log(e);
        },[])
    })

    if (users.length === null) return null

    return(
        <div>
                <h1> This is a pgae that I want to protect later</h1>
        {/* {
            users ? users.map(item=>{
                return(
                    <div key={item.id}>
                        {item.id} : {item.email}
                    </div>
                )
            }) : 'No users yet'
        } */}

        </div>
    )
}

export default Users