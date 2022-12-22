import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { FormInputLabel } from './FormInputLabel.js';
import '../../css/ItemForm.css'
import { connect } from 'react-redux';
import MapMyContainer from '../additional/maps/SaveLocationMap.js';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import jwt_decode from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import { addToLocatStorage, getFromLocalStorage } from '../../helpers/storage.js';
import Modal from 'react-bootstrap/Modal';


class ItemForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            item_data:[],
            category_select: '',
            categories: [],
            sub_category: [],
            sub_cat_select: '',
            selected_position: '',
            found_date: new Date(),
            user_id: '',
            note: '',
            lat: '',
            len: '',
            is_lost: false,
            is_found: false,
            resolved: false,
            redirect_register: false,
        }
    }

    componentDidMount() {
        const set_retrieved_item_data = ()=>{
            const check_data_type =()=>{
                const retreive = getFromLocalStorage('item_data_suspended')
                const edit = this.props.item_data
                return retreive ? retreive : edit
            }
        const stored_data = check_data_type()
        // console.log(stored_data);
        if(stored_data){
            this.setState({
                name:stored_data.name || '', 
                height:stored_data.height || '', 
                width:stored_data.width || '', 
                weight:stored_data.weight || '', 
                color_in:stored_data.color_in || '', 
                color_out:stored_data.color_out || '', 
                material:stored_data.material || '', 
                lat:stored_data.lat || '', 
                len:stored_data.len || '', 
                brand:stored_data.brand || ''
                })     
                }  
        }
        


        switch (this.props.type) {
            case 'add_lost_item':
                this.setState({is_lost:true})
                break;
            case 'add_found_item':
                this.setState({is_found:true})
                break;
            case 'edit_item':
                this.setState({item_data:[this.props.item_data]})
                console.log("im tryoing in here");
                set_retrieved_item_data(this.item_data)
                break;
            case 'get_pending_item':
                console.log("im in the pending toda", );
                set_retrieved_item_data(getFromLocalStorage('item_data_suspended'))
                break;
        }
    
        this.setState({ redirect_register: false })
        
        const get_token= async()=>{
        try {
            const decode = jwt_decode(this.props.token);
            const getUserId = decode.userId
            this.setState({ user_id: getUserId })
        }
        catch (e) {
            console.log(e);
        }
        }
        ;get_token()


    
        const getCategories = async () => {
            try {
                const res = await fetch('/category', {
                    method: 'GET'
                });
                const data = await res.json()
                this.setState({ categories: data })
            }
            catch (e) {
                console.log(e);
            }
        };
        getCategories();

     };
    
        



    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });

    }

    handleSelectChange = async (e) => {
        try {
            const res = await fetch(`http://localhost:3001/sub_cat/${e.target.value}`, {
                // method: 'GET'          
            });
            const data = await res.json()
            this.setState({ sub_category: data })
        }
        catch (e) {
            console.log(e);
        }
        console.log(e);
    }

    saved_position = (position) => {
   
        const lat = position.lat
        this.setState({ lat: lat });
        const lng = position.lng
        this.setState({ len: lng })

    }

    handleSubCatChange = async (e) => {
        this.setState({ sub_cat_select: e.target.value });
    }


    handleSubmit = (e) => {
        e.preventDefault();

        const add_item = async () => {
            const {edit_item_id} = this.props.item_id 
            const { name, height, width, weight, color_in, color_out, material, lat, len, brand, user_id,is_lost, is_found, found_date ,resolved} = this.state;
            try {
                console.log("the toekn", this.props.token);
                if (!this.props.token) {
                    addToLocatStorage('item_data_suspended', this.state)
                    this.setState({ redirect_register: true })
                }
                 else {
                    const check_saving_type = ()=>{
                        if(this.props.type === 'edit_item'){
                            console.log("this is an edit save");
                            const [edit_item_url, method] = [`http://localhost:3001/edit_item/:${edit_item_id}`, 'PUT']
                        }else{
                            const [url, method] =[ 'http://localhost:3001/add_item', 'POST'];
                        }
                    }; 
                   
                    
                    const db_found_item = await fetch(url, {
                        method: method,
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({ name, height, width, weight, color_in, lat, len, color_out, material, brand, user_id, is_found, is_lost, found_date, resolved})
                    });

                    const data = await db_found_item.json();
                    localStorage.clear();  
                }
            }
            catch (e) {
                console.log(e);
            }

        };
        add_item()
        
        
    };



    render() {
        return (
            <>
        
                {
                    this.state.redirect_register === true &&
                    (<Navigate to="/register" replace={true} />)
                }

                <form className='add_item_form' onSubmit={this.handleSubmit} >

                    <Col xs={10} md={7} lg={7} className='form_layout'>

                        <FormInputLabel name='name' value={this.state.name || ''} label='Item Name' type='text' onChange={this.handleInputChange} />

                        <label> Select Category</label>
                        <select name='category_select' className='input_conatainer' onChange={this.handleSelectChange}>
                            {this.state.categories.map((item, index) => {
                                return (
                                    <option key={index} value={item.cat_id || ''} >{item.name}</option>
                                )
                            })}
                        </select>
                        <label> Select Sub at</label>
                        <select name='sub_cat_select' className='input_conatainer' onChange={this.handleSubCatChange}>
                            {this.state.sub_category.map((item, index) => {
                                return (
                                    <option key={index} value={item.name ||''} >{item.name}</option>
                                )
                            })}
                        </select>
                        <FormInputLabel name='height' label='Height ' value={this.state.height || ''} type='number' onChange={this.handleInputChange} />
                        <FormInputLabel name='width' label='Width ' value={this.state.width || ''} type='number' onChange={this.handleInputChange} />
                        <FormInputLabel name='weight' label='Weight' value={this.state.weight || ''} type='number' onChange={this.handleInputChange} />
                        <FormInputLabel name='color_in' label='Color Inside' value={this.state.color_in || ''} type='text' onChange={this.handleInputChange} />
                        <FormInputLabel name='color_out' label='Color Outside' value={this.state.color_out || ''} type='text' onChange={this.handleInputChange} />
                        <FormInputLabel name='material' label='Material ' type='text'value={this.state.material || ''} onChange={this.handleInputChange} />
                        <FormInputLabel name='brand' label='Brand' type='text' value={this.state.brand || ''} onChange={this.handleInputChange} />
                        <FormInputLabel name='note' label='Additionals Notes' value={this.state.note || ''} type='text' onChange={this.handleInputChange} />
                    </Col>

                    <Col sm={10} md={5} lg={5} >
                        <MapMyContainer saved_position={this.saved_position} />
                    </Col> 
                    <Button type='submit' >{this.props.type === 'edit_item' ? 'Save Changes' : 'Save'}</Button>
                </form>
            </>
        )
    }


}

const mapStateToProps = (state) => {
    console.log();
    return {
        token: state.token,
        // add_item_load: state.add_item_load
    }
}



export default connect(mapStateToProps, null)(ItemForm)

