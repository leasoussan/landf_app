import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './FoundItemForm.css'
import { useContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { navigate, useNavigate } from 'react-router-dom';
import { AppContext } from '../App.js';
import FoundItemForm from './FoundItemForm.js'
import { connect } from 'react-redux';
import { addToLocatStorage } from '../helpers/storage.js';


const Home = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { token, setToken } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            console.log(localStorage);
            const decode = jwt_decode(token);
            const expire = decode.exp;
            if (expire * 1000 < new Date().getTime()) {
                navigate('/login')
            }else{
                // const user_id_token = decode.userId;
                // localStorage.setItem('user_id',user_id_token )
                // setUserId(user_id_token)
            }
        }
        catch (e) {
            console.log(e);
            setToken(null)
            navigate('/login')
        }

    }, [token])



    return (
        <>

            <div>
                <h1>Home</h1>
                <h2> Welcome {}</h2>
                <div>
                    <Button variant="primary" onClick={handleShow}>
                        Add Found Item
                    </Button>

                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Add Found Item</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <FoundItemForm />

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>

                        </Modal.Footer>
                    </Modal>

                </div>


            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        // userId: state.user_id,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // handleInsert: (trx) => dispatch(insert_trx(trx)),
        // handleUpdate: (trx) => dispatch(update_trx(trx))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)