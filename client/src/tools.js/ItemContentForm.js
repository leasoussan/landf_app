
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/esm/Col';
import '../css/ItemContent.css'

export const AddItemContent = () => {
    const [category_select, setCategorySelect] = useState('');
    const [categories, setCategories] = useState('');
    const [sub_cat_select, setSubCatSelect] = useState('');

    const [subCategory, setSubCategory] = useState('');
    const [color, setColor] = useState('')

    const getCategories = async () => {
        try {
            const res = await fetch('/category', {
                method: 'GET'
            });
            const data = await res.json()
            console.log("category in item content ", data);
            // setCategories(data)
        }
        catch (e) {
            console.log(e);
        }
    };
    getCategories();



    const handleSelectChange = async (e) => {
        console.log("e.target.value category select", e.target.value);
        try {
            setCategorySelect(e.target.value)
            const res = await fetch(`http://localhost:3001/sub_cat/${e.target.value}`);
            const data = await res.json()
            setSubCategory(data)
        }
        catch (e) {
            console.log(e);
        }
    }


    const handleSubCatChange = async (e) => {
        console.log("sub cat select e target", e.target.value);
        setSubCatSelect(e.target.value)
    }


    const handleColorSelect = (e) => {
        console.log("in the color handle event ", e.target.value);
        setColor("test")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("event click e targetsave ", e);
        // const {item_id, category_id, sub_cat, color} = 
        const add_content_item = async () => {
            try {
                // console.log(state);
                console.log("item_id", this.item_id);
                console.log("category_id", this.category_id);
                console.log("sub_cat", this.sub_cat);
                console.log("sub_colorat", this.color);

            }

            catch (e) {
                console.log(e);
            }

        }; add_content_item();
    }


    return (
        <>
            <div className='item_content_form'>


                <form className='add_item_form' onSubmit={handleSubmit} >

                    <Col xs={10} md={7} lg={7} className='form_layout'>

                        <label> Select Category</label>
                        <select name='category_select' className='input_conatainer' title={"yoyo"} onChange={handleSelectChange} >

                            {/* {
                                categories.map((item, index) => {
                                    return (
                                        <option key={index} value={item['cat_id'] || ''} >{item.name}</option>
                                    )
                                })
                            } */}

                        </select>

                        <label> Select Sub at</label>
                        {

                            <>
                                <select name='sub_cat_select' className='input_conatainer' onChange={handleSubCatChange} >
                                    {/* {
                                       sub_category.map((item, index) => {
                                            return (
                                                <option key={index} value={item['sub_cat_id'] || ''} >{item.name}</option>
                                            )
                                        })
                                    } */}
                                </select>
                            </>
                        }

                        <label> color</label>
                        {

                            <>
                                <select name='color_select' className='input_conatainer' onChange={handleColorSelect} >



                                    {/* {
                                       color.map((item, index) => {
                                            return (
                                                <>
                                                     <div className='color_dropDown'>
                                                        <option key={index} value={item.name} >{item.name}</option>
 </div>
                                                </>
                                            )
                                        })
                                    } */}


                                </select>
                            </>
                        }</Col>
                    {/* {this.props.type === 'edit_item' ? 'Save Changes' : 'Save'} */}
                    <Button type='submit' >BUTON</Button>
                </form>


            </div>

        </>
    )


}







const ItemContentForm = () => {
    return (
        <Accordion >
            <Accordion.Item eventKey="0">
                <Accordion.Header>Add Item Content</Accordion.Header>
                <Accordion.Body>


                    <AddItemContent />


                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default ItemContentForm;