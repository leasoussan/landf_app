import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../css/ItemForm.css'
import React,{ creteContext, useContext, useState, useEffect } from 'react';
    import jwt_decode from 'jwt-decode';
import { navigate, useNavigate } from 'react-router-dom';
import ItemForm from './items/ItemForm';
import { AppContext } from '../App';
import { connect } from 'react-redux';
import { getFromLocalStorage } from "../helpers/storage.js";
import axios from 'axios';
import { get_token,set_global_categories, set_global_subCat_cat} from '../redux/actions.js';




const Home = (props) => {
    
    const [redirect, setRedirect] = useState(false)
    const {token, setToken, isCategory , setIsCategory } = useContext(AppContext)
    const [userId, setUserId] = useState('');
    const [type, setType] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [check_pending_data, setCheckPendingData] = useState('')


    useEffect(() => {
        console.log("effect ********",isCategory );
        const verify = async () => {
            try {
                console.log(token);
                const get_token = jwt_decode(token)
                const user_id = get_token.userId
                console.log("the user in home ", user_id);
                if(get_token){
                    check_data_exisit()
                    // setRedirect(true)
                }
              
            } catch (e) {
                // setToken(null)
                console.log("no token in the system yo");
            }
        };verify()

      
            
        const getCategories = async () => {
            try {
                const res = await fetch('/category', {
                    method: 'GET'
                });
                const data = await res.json();
                console.log("data get cat from home ", data);
                props.store_global_categories(data);
        
            }
            catch (e) {
                console.log(e);
                console.log("do we have a problem ");
            }
         
        };
        getCategories();

        let subCat_Cat_global_object = [];

        const get_sub_cat_global_list = async ()=>{
            try{
                const res = await fetch('/sub_cat', {
                    method: 'GET'
                });
                
                const data = await res.json();
                const globalCategories =  [...new Map(data.map(item => [item['subcat_cat_id'], item['cat_name']]))];
                
                globalCategories.forEach((cat)=> {
                const subcat_perCat = data.filter(item => item['subcat_cat_id'] === cat[0])
                const cat_andSubCat_item = [cat,subcat_perCat ];
                subCat_Cat_global_object.push(cat_andSubCat_item)
                    
            })
            console.log("subcat global", subCat_Cat_global_object);
            props.store_global_subCat_cat(subCat_Cat_global_object)  
            }
            catch(e){
                console.log(e);
            }
        };get_sub_cat_global_list()
    

        const check_data_exisit = () => {
            const data = getFromLocalStorage('pending_data')
            if (data) {
                console.log("Local storage data", data);
                setType('get_pending_item')
                // const get_token = jwt_decode(token)
                // const user_id =  get_token.userId
                // setUserId(user_id)
            } else {
                console.log("nothing to show");
            }
        };check_data_exisit()
        



    }, [isCategory])

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
        global_categories: state.global_categories,
        global_sub_cat_per_cat: state.global_sub_cat_per_cat,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        store_token: (token)=>{ dispatch(get_token(token))},
        store_global_categories :(list) => {dispatch(set_global_categories(list))},
        store_global_subCat_cat :(list) => {dispatch(set_global_subCat_cat(list))}
    }
}

// export default Home
export default connect(mapStateToProps, mapDispatchToProps)(Home)


 //