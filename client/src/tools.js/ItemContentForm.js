import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/esm/Col';
import '../css/ItemContent.css'
import { connect } from 'react-redux';

const AddItemContent = (props) => {
    const [category_select, setCategorySelect] = useState('');
    const [categories, setCategories] = useState('');
    const [sub_cat_select, setSubCatSelect] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [color, setColor] = useState('')

    useEffect(()=>{
            // console.log(this.props);
    },[])


    const getCategories =  () => {
        console.log("nadie me olvido yosoy trnaquila");
        try{
            // const global_categories = this.props.global_categories;
           console.log(this.props);
        }
        catch(e){
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

                    <Col xs={12} md={5} lg={4} className='form_layout'>

                        <label> Select Category</label>
                        <select name='category_select' className='input_conatainer' title={"yoyo"} onChange={handleSelectChange} >

                            {
                                console.log(typeof categories)
                                // categories.map((item, index) => {
                                    
                                //     return (
                                //         <option key={index} >{item.name}</option>
                                //     )
                                // })
                            }

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







export const ItemContentForm = () => {
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


const mapStateToProps = (state) => {
    console.log("this state", state);
    const global_categories= state.global_categories;
    const global_sub_cat_per_cat= state.global_sub_cat_per_cat;

    return {
        global_categories,
        global_sub_cat_per_cat
    };

}


const mapDispatchToProps = (dispatch) => {
    return {
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddItemContent)

