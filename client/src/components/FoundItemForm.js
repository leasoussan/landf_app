import { Button } from '@mui/material';
import React from 'react';
import { FormInputLabel } from './FormInputLabel.js';
import './FoundItemForm.css'
import { connect } from 'react-redux';
import MapMyContainer from './MapMyContainer.js';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

class FoundItemForm extends React.Component {
    constructor() {
        super();
        this.state = {
            name:'',
            category_select: '',
            categories: [],
            sub_category: [],
            sub_cat_select:'',
            selected_position:'',
            found_date: Date(),
            user_id: '',
            note: '',
            is_lost: false,
            is_found: false,
            resolved: false,
            // show: false
        }
    }

    componentDidMount() {
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
    }
    

    handleInputChange =(e)=>{
        this.setState({[e.target.name] : e.target.value});
       
    }

    // saved_position =(this.saved_position)={
    //     this.setState({})
    // }
    handleSelectChange = async (e) => {
        try {
            const res = await fetch(`http://localhost:3001/sub_cat/${e.target.value}`, {
                // method: 'GET'          
            });
            const data = await res.json()
            console.log(data);
            this.setState({ sub_category: data })
        }
        catch (e) {
            console.log(e);
        }
        console.log(e);
    }

    saved_position = (position)=>{
        this.setState({selected_position:position});
    }

    handleSubCatChange = async (e) => {
        this.setState({sub_cat_select:e.target.value});
    }

   
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({is_found:true})
        const add_found_item = async()=>{
            const{width, weight, color_in, color_out, material, brand, user_id, is_found,found_date } = this.state;
            try{
                const add_found_item = await fetch('/add_found_item/', {
                    method:'POST',
                    headers:{
                        'Contexte-type':'application/json'
                    },
                    body: JSON.stringify({ width, weight, color_in, color_out, material, brand, user_id, is_found,found_date })
                });               
            }
            catch{
    
            }
        }
        
    

    };



    render(){
        return (
            <>
                <form className='add_item_form' onSubmit={this.handleSubmit} >

                        <Col xs={10} md={7} lg={7} className='form_layout'>

                            <FormInputLabel name='name' label='Item Name' type='text' onChange={this.handleInputChange} />

                            <label> Select Category</label>
                            <select name='category_select' className='input_conatainer' onClick={this.handleSelectChange}>
                                {this.state.categories.map((item, index) => {
                                    return (
                                        <option key={index} value={item.cat_id} >{item.name}</option>
                                    )
                                })}
                            </select>
                            <label> Select Sub at</label>
                            <select name='sub_cat_select' className='input_conatainer' onChange={this.handleSubCatChange}>
                                {this.state.sub_category.map((item, index) => {
                                    return (
                                        <option key={index} value={item.name} >{item.name}</option>
                                    )
                                })}
                            </select>
                            <FormInputLabel name='heigh' label='Height ' onChange={this.handleInputChange} />
                            <FormInputLabel name='width' label='Width ' type='number' onChange={this.handleInputChange}/>
                            <FormInputLabel name='weight' label='Weight' type='number' onChange={this.handleInputChange}/>
                            <FormInputLabel name='color_in' label='Color Inside' type='text' onChange={this.handleInputChange}/>
                            <FormInputLabel name='color_out' label='Color Outside' type='text' onChange={this.handleInputChange}/>
                            <FormInputLabel name='material' label='Material ' type='text' onChange={this.handleInputChange}/>
                            <FormInputLabel name='brand' label='Brand' type='text' onChange={this.handleInputChange}/>
                            <FormInputLabel name='note' label='Additionals Notes' type='text' onChange={this.handleInputChange}/>
                        </Col>

                        <Col sm={10} md={5} lg={5} >
                          <MapMyContainer saved_position={this.saved_position} />
                        </Col>

             


                    <Button type='submit' >ADD ITEM </Button>
                </form>
            </>
        )
    }

}


export default FoundItemForm