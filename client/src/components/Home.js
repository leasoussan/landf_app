import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './FoundItemForm.css'
import { useContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { navigate, useNavigate } from 'react-router-dom';
import FoundItemForm from './FoundItemForm.js'
import { AppContext } from '../App.js';
import { connect } from 'react-redux';

import { get_token } from '../redux/actions.js';

const Home = (props) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    console.log(props.store_token);
  
    
    

return (
    <>  

        <div>
            <h1>Home</h1>
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

                        <FoundItemForm/>

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
        // get_token: (data)=> dispatch(get_token(data))
}
}

// export default Home
export default connect(mapStateToProps, mapDispatchToProps)(Home)


 //