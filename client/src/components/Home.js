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

import { get_token } from '../redux/actions.js';

const Home = (props) => {
    const [type, setType] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);


    const handleShow = (type) => {
        switch (type) {
            case 'add_found_item':
                setType('add_found_item')
                break;
            case 'add_lost_item':
                setType('add_lost_item')
                break;

        }
        setShow(true);

    }
    useEffect(() => {
        console.log("effect home", props.store_token);
    }, [])



    return (
        <>

            <div>
                <h1>Home</h1>
                <div>
                    <Button variant="primary" onClick={() => handleShow('add_found_item')}>
                        Add Found Item
                    </Button>

                    <Button variant="secondary" onClick={() => handleShow('add_lost_item')}>
                        Add Lost Item
                    </Button>

                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>{type==='add_lost_item' ? "Add Lost Item" : "Add Found Item" }</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <ItemForm  type={type} />

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

const mapStateToProps = state => {
    return {
        store_token: state.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

// export default Home
export default connect(mapStateToProps, mapDispatchToProps)(Home)


 //