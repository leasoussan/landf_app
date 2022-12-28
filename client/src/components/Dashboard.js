import React, { useState, useContext, useEffect } from "react"
import { connect } from "react-redux";
import { AppContext } from '../App';
import jwt_decode from 'jwt-decode';
import Users from "./Users";
import '../css/Dashboard.css'
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ItemDetail from "./items/ItemDetail.js";
import { user_foundList_toStore, user_lostList_toStore } from "../redux/actions.js";
import CheckItemMatch from "./items/CheckItemMatch.js";

const Dashboard = (props) => {
    const [userId, setUserId] = useState('')
    const [foundList, setFoundList] = useState('')
    const [lostList, setLostList] = useState('')
    const [redirect, setRedirect] = useState(false)
    const { token, setToken } = useContext(AppContext)
    const [show, setShow] = useState(false);
   

    // i nened to check toekn if use effete with try and cathc to avoid breaking -error
    const navigate = useNavigate();


    useEffect(() => {
        
       
        const getUserFoundList = async () => {

            try {
                const get_token = await jwt_decode(token)
                const user_id = await get_token.userId
                console.log("user_id dashborad from token ",user_id);
                setUserId(user_id)
                const get_found_list = async () => {
                    try {
                        const response = await fetch(`http://localhost:3001/found_item_list/${user_id}`, {
                            headers:{
                                'x-access-token':token
                            }
                        })
                        const data = await response.json()
                        if(response.status === 200){
                            setFoundList(data);
                            props.foundList_toLocal(data)
                        }
                        else{
                            navigate('/login')
                        }
                       
                    }
                    catch (e) {
                    
                        console.log(e);
                    }
                };
                get_found_list()

                const get_lost_list = async () => {
                    try {
                        const get_token = await jwt_decode(token)
                        const user_id = await get_token.userId
                        console.log("user_id dashborad from token ",user_id);
                        setUserId(user_id)

                        const response = await fetch(`http://localhost:3001/lost_item_list/${user_id}`,{
                            headers:{
                                'x-access-token':token
                            }
                        })
                        const data = await response.json()
                        if(response.status === 200){

                        setLostList(data);
                        props.lostList_toLocal(data)
                    }
                    else{
                        navigate('/login')
                    }
                    }
                    catch (e) {
                        console.log(e);
                    }

                };
                get_lost_list()


            } catch (e) {

                console.log(e);
                navigate('/login')
            }
        }
        getUserFoundList()
    }, [])



    return (


        <div className="dashboard_display">
            <h1>Dashboard  Hi {userId}</h1>

            {/* {
                this.props.token && localStorage.getItem('item_data_suspended') ?
                   alert(
                        <div>
                            hola
                        </div>
                   )
                    :
                    'nothing'
            } */}

            <section className="dashboard_sections">


                <div className="foundItem_display">

                    <h1>FOUND ITEMS</h1>




                    {
                        foundList.length > 0 ?

                            foundList.map((item) => {
                                return (
                                    <div key={item.id}>

                                        <p className="text-sm text-gray-500">Is Lost: {item.is_found ? "Yes I found it:) waiting for you " : "this item is in the wrong place"}</p>

                                        <ItemDetail item_id={item.id} userId ={userId} />

                                        <CheckItemMatch item_data={item} type={item.is_found ? 'found' : 'lost'} />
                                    </div>
                                )

                            })
                            :
                            "hii"

                    }
                </div>

                <div className="foundItem_display">
                    <h1> LOST ITEMS </h1>


                    {/* {
                        localStorage.getItem('item_data_suspended') ?
                    <Button >GET PENDING</Button>
                    :
                        'nothing'
                    } */}

                    <ul className="divide-y divide-gray-200">



                        {
                            lostList.length > 0 ?

                                lostList.map((item) => {
                                    return (
                                        <div key={item.id}>
                                            <li className="py-4 flex">
                                                <img className="h-10 w-10 rounded-full" src={''} alt="" />
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-900">Is Lost: {item.is_lost ? "Yes I'm still Looking for it " : "this item is in the wrong place"}</p>
                                                    <p className="text-sm text-gray-500">{item.category}</p>
                                                </div>


                                            </li>
                                            <ItemDetail item_id={item.id} />
                                            <CheckItemMatch item_data={item} type={item.is_lost ? 'lost' : 'found'} />
                                        </div>
                                    )

                                })
                                :
                                "hii"

                        }
                    </ul>
                </div>

            </section>
        </div>
    )
}



const mapStateToProps = (state, ownProps) => {
    console.log(state);
    return {
        token: state.token,

    }
}


const mapDispatchToProps = (dispatch) => {
    return {

        foundList_toLocal: (list) => dispatch(user_foundList_toStore(list)),
        lostList_toLocal: (list) => dispatch(user_lostList_toStore(list))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
