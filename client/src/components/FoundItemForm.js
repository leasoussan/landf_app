import { Button } from '@mui/material';
import React from 'react';
import { FormInputLabel } from './FormInputLabel.js';
import './FoundItemForm.css'
import {TextField} from '@mui/material';


class FoundItemForm extends React.Component {
    constructor() {
        super();
        this.state = {
            id: '',
            category_select:'',
            categories :[],
            sub_category_select: [],
            lat: '',
            len: '',
            found_date: '',
            user_id: '',
            note: '',
            is_lost: false,
            is_found: false,
            resolved: false
        }
    }

    componentDidMount(){
        const getCategories = async()=>{
            const {categories} = this.state.categories 
          
            try{
                const res = await fetch('/category', {
                    methode: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        body: JSON.stringify({ categories })
                    }
                });
                const data = await res.json()
                this.setState({ category_select: data })
            }
            catch(e){
                console.log(e);
            }
        };
        getCategories()

        const getSubCat = async()=>{
            const {category_selected} = this.state.category_select
            console.log(category_selected);
            try{
                const res = await fetch('/sub_cat', {
                    methode: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        body: JSON.stringify({ category_selected })
                    }
                });
                const data = await res.json()
                this.setState({ sub_category_select: data })
            }
            catch(e){
                console.log(e);
            }
        };
        getSubCat()
    }   


    handleSelectChange= (e) =>{
        // e.preventDefault();
        console.log(e);
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        console.log(e);
    }



    render() {
        console.log(this.state.category_select);
        return (
            <>
                <form className='add_item_form' onSubmit={this.handleSubmit}>
                    <FormInputLabel id='name' label='Item Name' type='text' />

                    <select id='category_select'  name='category_select' onClick={this.handleSelectChange}>
                        {this.state.categories.map((item,index) =>{
                            return(
                                <option key={index} value={item.name} >{item.name}</option>
                            )
                        })}
                    </select>

                    <select id='sub_cat_select' name='sub_cat_select' lable='subcat Setelc' onClick={this.handleSelectChange}>
                        {this.state.sub_category_select.map((item,index) =>{
                            return(
                                <option key={index} value={item.name} >{item.name}</option>
                            )
                        })}
                    </select>
                    <FormInputLabel id='heigh' label='Height ' type='number' className='' />
                    <FormInputLabel id='width' label='Width ' type='number' />
                    <FormInputLabel id='weight' label='Weight' type='number' />
                    <FormInputLabel id='color_in' label='Color Inside' type='text' />
                    <FormInputLabel id='color_out' label='Color Outside' type='text' />
                    <FormInputLabel id='material' label='Material ' type='text' />
                    <FormInputLabel id='brand' label='Brand' type='text' />
                    <FormInputLabel id='note' label='Additionals Notes' type='text' />
             
                    <Button type='submit' >ADD </Button>
                </form>
            </>
        )
    }
}



export default FoundItemForm