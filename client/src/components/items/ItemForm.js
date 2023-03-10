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
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import axios from 'axios';
import {get_token} from '../../redux/actions.js'



class ItemForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item_id: '',
            name: '',
            item_data: [],
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
            db_url: '',
            url_method: '',
        }
    }

    componentDidMount() {
        console.log(this.props.type);
        this.setState({ redirect_register: false })

        const getCategories = async () => {
            try {
                const res = await fetch('/category', {
                    method: 'GET'
                });
                const data = await res.json()
                console.log(data);
                console.log(data[0].name);
                this.setState({ categories: data })
            }
            catch (e) {
                console.log(e);
            }
        };
        getCategories();

        const set_retrieved_item_data = () => {

            const check_data_type = () => {
                const retreive = getFromLocalStorage('pending_data')
                console.log("retreive", retreive);
                const edit = this.props.item_data

                return retreive ? retreive : edit
            }
            const stored_data = check_data_type()
            console.log("stored_data---results", stored_data);
            if (stored_data) {
                this.setState({
                    item_id: stored_data.id || '',
                    name: stored_data.name || '',
                    category_select: stored_data.category_id || '',
                    found_date: stored_data.found_date || '',
                    height: stored_data.height || '',
                    width: stored_data.width || '',
                    weight: stored_data.weight || '',
                    color_in: stored_data.color_in || '',
                    color_out: stored_data.color_out || '',
                    material: stored_data.material || '',
                    lat: stored_data.lat || '',
                    len: stored_data.len || '',
                    brand: stored_data.brand || '',
                    // user_id: stored_data.user_id || '',
                    sub_cat_select: stored_data.sub_category || '',
                    is_lost: stored_data.is_lost,
                    is_found: stored_data.is_found,
                    resolved: stored_data.resolved,

                })
            }
        }

        let decode_token = this.state.token;

        switch (this.props.type) {
         

            case 'add_lost_item':
                try{
                    const decode_token = jwt_decode(this.props.token)                   
                    this.setState({user_id:decode_token.userId})                
                     this.setState({ is_lost: true })

                }
                catch(e){
                    console.log(e);
                }
                break;


            case 'add_found_item':
                try{
                    const decode_token = jwt_decode(this.props.token)                   
                    this.setState({user_id:decode_token.userId})
                    this.setState({ is_found: true })
                }
                catch(e){
                    console.log(e);
                }
              
                break;


            case 'edit_item':
                try{
                    const decode_token = jwt_decode(this.props.token)
                    this.setState({user_id:decode_token.userId})
                    set_retrieved_item_data(this.item_data);
                }
                catch(e){
                    console.log(e);
                }
    
                // if (this.props.item_data.is_lost === true) {
                // }
                break;


            case 'get_pending_item':
                try{
                    const decode_token = jwt_decode(this.props.token)                   
                    this.setState({user_id:decode_token.userId})
                    set_retrieved_item_data(getFromLocalStorage('pending_data'))
                }
                catch(e){
                    console.log(e);
                }
                        
                break;
        }


        const check_saving_type = () => {
            // const {url , method_url} = [this.state.db_url, this.state.url_method]
            if (this.props.type === 'edit_item') {
                // [url, method_url] = [(`http://localhost:3001/edit_item/:${this.state.item_id}`), 'PUT']
                this.setState({ db_url: `http://localhost:3001/edit_item/${this.props.item_data.id}` })
                this.setState({ url_method: 'PUT' })

            } else {
                console.log("we are in else");
                this.setState({ db_url: 'http://localhost:3001/add_item' })
                this.setState({ url_method: 'POST' })
            }

        }; check_saving_type()


    };



    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });

    }

    handleSelectChange = async (e) => {
        try {
            this.setState({ category_select: e.target.value })
            const res = await fetch(`http://localhost:3001/sub_cat/${e.target.value}`);
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
        console.log(e.target.value);
        this.setState({ sub_cat_select: e.target.value });
    }




    handleSubmit = (e) => {
        e.preventDefault();
     
        const verify = async() => {
            console.log("in the verif");
            try{
                console.log("in the verif TRY");
                const response = await axios.get('/token')
                console.log("the response ",response);
                this.props.get_token(response.data.token) 

            }catch(e){
                console.log("in the verif CATCH ");
                addToLocatStorage('pending_data', (this.state))
                this.setState({ redirect_register: true })
                alert("you have to do somethng")
            }
        }
        verify()

        if (!this.props.token) {
            console.log("this is the place");

        
        

        } else {

            const add_item = async () => {
                try {

                    // const { item_id } = this.state.item_id
                    const { id, name, height, width, weight, color_in, color_out, material, lat, len, brand, user_id, is_lost, is_found, found_date, resolved, category_select, sub_cat_select } = this.state;
                    console.log("this state pre save", this.state);
                    if (this.props.type === 'edit_item') {
                        const id = this.state.item_id
                        console.log(this.state);

                    }
                    const save_to_db = async () => {

                        try {
                            const url = this.state.db_url;
                            const method = this.state.url_method;
                            const category_id = category_select;
                            const sub_category = sub_cat_select;
                            console.log("item add before save ", id);
                            const results = await fetch(url, {
                                method: method,
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ id, name, height, width, weight, color_in, color_out, material, lat, len, brand, user_id, is_lost, is_found, found_date, resolved })
                            });
                            console.log(results);
                            const data = await results.json();
                            console.log(data);
                            localStorage.clear();
                            this.setState({show:false})
                            console.log("befor exit");
                        }

                        catch (e) {
                            console.log(e);
                        }

                    }; save_to_db()

                }

                catch (e) {
                    console.log(e);
                }

            }; add_item();

        }
    }

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
                        <select name='category_select' className='input_conatainer' title={"yoyo"} onChange={this.handleSelectChange} >

                            {
                                this.state.categories.map((item, index) => {
                                    return (
                                        <option key={index} value={item['cat_id'] || ''} >{item.name}</option>
                                    )
                                })
                            }

                        </select>

                        <label> Select Sub at</label>
                        {

                            <>
                                <select name='sub_cat_select' className='input_conatainer' onChange={this.handleSubCatChange} >
                                    {
                                        this.state.sub_category.map((item, index) => {
                                            return (
                                                <option key={index} value={item['sub_cat_id'] || ''} >{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </>
                        }
                        <FormInputLabel name='height' label='Height ' value={this.state.height || ''} type='number' onChange={this.handleInputChange} />
                        <FormInputLabel name='width' label='Width ' value={this.state.width || ''} type='number' onChange={this.handleInputChange} />
                        <FormInputLabel name='weight' label='Weight' value={this.state.weight || ''} type='number' onChange={this.handleInputChange} />
                        <FormInputLabel name='color_in' label='Color Inside' value={this.state.color_in || ''} type='text' onChange={this.handleInputChange} />
                        <FormInputLabel name='color_out' label='Color Outside' value={this.state.color_out || ''} type='text' onChange={this.handleInputChange} />
                        <FormInputLabel name='material' label='Material ' type='text' value={this.state.material || ''} onChange={this.handleInputChange} />
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


const mapDispatchToProps = (dispatch) => {
    return {
        get_token: (token)=> dispatch(get_token(token))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ItemForm)

