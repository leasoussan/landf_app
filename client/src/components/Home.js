import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../css/ItemForm.css'
import { useContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { navigate, useNavigate } from 'react-router-dom';
import ItemForm from './items/ItemForm';
import { AppContext } from '../App';
import { connect } from 'react-redux';
import { getFromLocalStorage } from "../helpers/storage.js";
import axios from 'axios';
import { get_token } from '../redux/actions.js';

const Home = (props) => {
    const [redirect, setRedirect] = useState(false)
    const {token, setToken} = useContext(AppContext)
    const [userId, setUserId] = useState('');
    const [type, setType] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [check_pending_data, setCheckPendingData] = useState('')


    useEffect(() => {
        const verify = async () => {
            try {
                console.log(token);
                // const get_token = jwt_decode(token)
                // console.log(get_token);
                // if(response){
                //     // setToken(response.data.token)
                //     check_data_exisit()
                //     setRedirect(true)
                // }
              
            } catch (e) {
                // setToken(null)
                console.log("no token in the system yo");
            }
        };verify()

        const check_data_exisit = () => {
            const data = getFromLocalStorage('pending_data')
            if (data) {
                setType('get_pending_item')
                // const get_token = jwt_decode(token)
                // const user_id =  get_token.userId
                // setUserId(user_id)
            } else {
                console.log("nothing to show");
            }
        };check_data_exisit()
        



    }, [])

    const handleShow = (type) => {
        switch (type) {
            case 'add_found_item':
                setType('add_found_item')
                break;
            case 'add_lost_item':
                setType('add_lost_item')
                break;
            case 'get_pending_item':
                console.log("this is going well girls ");
                setType('get_pending_item')
                break;

        }
        setShow(true);

    }


    return (
        <>

            <div>
                <h1>Home</h1>

                {
                   token && type === 'get_pending_item' ?


                        <div>

                            <Button variant="primary" onClick={() => handleShow('get_pending_item')}>
                                finish up your
                            </Button>
                        </div>
                        :
                        <div>
                            <Button variant="primary" onClick={() => handleShow('add_found_item')}>
                                Add Found Item
                            </Button>

                            <Button variant="secondary" onClick={() => handleShow('add_lost_item')}>
                                Add Lost Item
                            </Button>

                    
                       </div>
                }
                            <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>{type === 'add_lost_item' ? "Add Lost Item" : "Add Found Item"}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                    <ItemForm type={type} />

                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>

                                </Modal.Footer>
                            </Modal>

                        </div>

        </>
    )
}

const mapStateToProps = state => {
    return {
        // stored_token: state.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        store_token: (token)=>{ dispatch(get_token(token))}
    }
}

// export default Home
export default connect(mapStateToProps, mapDispatchToProps)(Home)


 //