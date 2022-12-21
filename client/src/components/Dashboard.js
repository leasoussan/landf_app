import { useState, useContext, useEffect } from "react"
import { connect } from "react-redux";
import { AppContext } from '../App';
import jwt_decode from 'jwt-decode';
import Users from "./Users";

const Dashboard = (props) => {
    const [userId, setUserId] = useState('') 
    const [foundList, setFoundList] = useState('')
    const [redirect, setRedirect] = useState(false)

    const { token, setToken } = useContext(AppContext)
    const get_token = jwt_decode(token)
    const user_id = get_token.userId   
    
    useEffect(()=>{
        const getUserFoundList = async() => {
            try{
                const response = await fetch(`http://localhost:3001/dashboard/${user_id}`)
                const data = await response.json()
                setFoundList(data) 
            }catch(e){
                console.log(e);
            }
        }
        getUserFoundList()
    },[])

    console.log(foundList);
    
   

    return (

        <div>
            <h1>Dashboard </h1>
               { 
               foundList ?

               foundList.forEach(element => {
                    return(
                        <div>
                            <h1>{element.id}</h1>
                        </div>
                    )
               })
            //    foundList.map((item)=>{
            //     <div>
            //         {item.id}
            //         </div>
            //    })
               :
               "hii"
                
               }     
                
        </div>
    )
}



const mapStateToProps = (state , ownProps) => {
    // console.log(state);
    return {
        token: state.token,
        // add_item_load: state.add_item_load
    }
}
export default connect(mapStateToProps)(Dashboard)