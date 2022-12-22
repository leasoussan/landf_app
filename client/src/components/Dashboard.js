import React, { useState, useContext, useEffect } from "react"
import { connect } from "react-redux";
import { AppContext } from '../App';
import jwt_decode from 'jwt-decode';
import Users from "./Users";
import '../css/Dashboard.css'
import { Link ,Routes, Route, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ItemDetail from "./items/ItemDetail.js";

const Dashboard = ({navigation}) => {
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
            const get_token = await jwt_decode(token)
            const user_id = await get_token.userId
            console.log("checking you ", user_id);
            setUserId(user_id)
            try {
                const get_found_list = async () => {
                    try{
                    const response = await fetch(`http://localhost:3001/found_item_list/${user_id}`,)
                    const data = await response.json()
                    console.log("data fromfound list", data);
                    setFoundList(data)
                    }
                    catch(e){
                        console.log(e);
                    }
                };
                get_found_list()

                const get_lost_list = async () => {
                    try{
                        const response = await fetch(`http://localhost:3001/lost_item_list/${user_id}`,)
                        const data = await response.json()
                        console.log("data from Lost list", data);
                        setLostList(data)
                    }
                    catch(e){
                        console.log(e);
                    }
                    
                };
                get_lost_list()


            } catch (e) {
                console.log(e);
            }
        }
        getUserFoundList()
    }, [])


    const handleClickToItemDetail=(e)=>{
        const item_id = e.target.value;
        
        navigate(`/item_detail/${e.target.value}`, {item_id});
    }



    return (
        <div className="dashboard_display">
            <h1>Dashboard  Hi {userId}</h1>

            <section className="dashboard_sections">


                <div className="foundItem_display">

                    <h1>FOUND ITEMS</h1>
                    {
                        foundList.length > 0 ?

                            foundList.map((item) => {
                                return (
                                <div key={item.id}>
                                    <li className="py-4 flex">
                                        <img className="h-10 w-10 rounded-full"  alt="" />
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">{item.name}{item.id}</p>
                                            <p className="text-sm text-gray-500">Is Lost: {item.is_found ? "Yes I found it:) waiting for you " : "this item is in the wrong place"}</p>
                                           
                                            <ItemDetail item_id={item.id}/>
                                            
                                        </div>
                                    </li>
                                </div>
                                )

                            })
                            :
                            "hii"

                    }
                </div>
                <div className="foundItem_display">
                    <h1> LOST ITEMS </h1>
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
                                        <ItemDetail item_id={item.id}/>
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
    return {
        token: state.token,
    }
}
export default connect(mapStateToProps)(Dashboard)
