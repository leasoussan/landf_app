
import Button from 'react-bootstrap/Button';
import { useEffect, useState, useContext } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/esm/Col';
import '../css/ItemContent.css'
import { connect } from 'react-redux';
import { AppContext } from '../App';
import { set_global_subCat_cat } from '../redux/actions.js';
import Colors from './Colors.js';

export const AddItemContent = (props) => {
    const { token, setToken, isCategory, setIsCategory } = useContext(AppContext)
    const [category_select, setCategorySelect] = useState('');
    const [categories, setCategories] = useState([]);
    const [sub_cat_select, setSubCatSelect] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [color, setColor] = useState('')

    useEffect(() => {
        console.log(props);
        const checkState = () => {
            if (props.globalCat.length === 0) {
                console.log("the place to be", props.global_sub_cat_per_cat);
                setIsCategory(true)
                let subCat_Cat_global_object = [];
                const get_sub_cat_global_list = async () => {
                    try {
                        const res = await fetch('/sub_cat', {
                            method: 'GET'
                        });

                        const data = await res.json();
                        const globalCategories = [...new Map(data.map(item => [item['subcat_cat_id'], item['cat_name']]))];

                        globalCategories.forEach((cat) => {
                            const subcat_perCat = data.filter(item => item['subcat_cat_id'] === cat[0])
                            const cat_andSubCat_item = [cat, subcat_perCat];
                            setCategories(cat);
                            subCat_Cat_global_object.push(cat_andSubCat_item);
                            setCategories(cat_andSubCat_item)

                        })
                        props.store_global_subCat_cat(subCat_Cat_global_object)
                    }
                    catch (e) {
                        console.log(e);
                    }
                }; get_sub_cat_global_list()
            }
        }; checkState()

        const global_categories = props.globalCat;
        let cat_list_to_state = [];
        for (const category of global_categories) {
            const cat = category[0];
            cat_list_to_state.push(cat)
        }
        setCategories(cat_list_to_state);
    }, [])

    const handleSelectChange = async (e) => {
        console.log(e);
        try {
            setCategorySelect(e.target.value)
            const sub_cat_toExtract = props.globalCat;
            console.log(props.globalCat);
            const filterSubCat = sub_cat_toExtract.filter((global_cat_object) => {
                console.log(typeof global_cat_object[0][0]);
                return global_cat_object[0][0].toString() === e.target.value
            })
            console.log("jkygijkghk9999999999999999", filterSubCat);
            setSubCategory(Object.entries(filterSubCat[0][1]));

        }
        catch (e) {
            console.log(e);
        }
        console.log(e);
    }


    const handleSubCatChange = async (e) => {
        setSubCatSelect(e.target.value)
    }

    const handleColorSelect = (selected_color) =>{
        setColor(selected_color)
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const[category_id, sub_cat, color_select]= [category_select, sub_cat_select, color]
        const add_content_item = async () => {
            console.log(typeof color);
            try {
                const  to_db = await fetch('/item_content',{
                    method:'POST',
                    headers:{
                        "content-Type":'application/json'
                    },
                    body:(JSON.stringify({category_id, sub_cat, color_select}))
                })
                const data = await to_db.json()
                console.log("theDAT",data);
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

                                categories.map((item,i) => {
                                    return (
                                        <>
                                            <option key={i} value={item[0]} >{item[1]}</option>
                                        </>

                                    )
                                })
                            }

                        </select>

                        <label> Select Sub at</label>
                        {

                            <>
                                <select name='sub_cat_select' className='input_conatainer' onChange={handleSubCatChange} >
                                    {
                                        subCategory ?



                                        subCategory.map((element, i) => {
                                            console.log(element);

                                            return (
                                                <>
                                                    <option key={i} value={element[1].sub_cat_id} >{element[1].name}</option>
                                                </>
                                            )
                                        })

                                        :
                                        console.log("just tel me the problem ")
                                    }
                                </select>
                            </>
                        }

                        <label> color</label>

                        <Colors selected_color ={handleColorSelect}/>
                        
                       
                    {/* {this.props.type === 'edit_item' ? 'Save Changes' : 'Save'} */}
                    <Button type='submit' >BUTON</Button>
                    </Col>
                </form>


            </div>

        </>
    )


}







const ItemContentForm = (props) => {
    console.log("we are here ", props);
    return (
        <Accordion >
            <Accordion.Item eventKey="0">
                <Accordion.Header>Add Item Content</Accordion.Header>
                <Accordion.Body>


                    <AddItemContent globalCat={props.global_sub_cat_per_cat} store_global_subCat_cat={props.store_global_subCat_cat}  />

                    {/*  */}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}


const mapStateToProps = (state) => {
    // console.log("this state", state.global_sub_cat_per_cat);

    return {
        global_categories: state.global_categories,
        global_sub_cat_per_cat: state.global_sub_cat_per_cat,
    };

}


const mapDispatchToProps = (dispatch) => {
    return {

        store_global_subCat_cat: (list) => { dispatch(set_global_subCat_cat(list)) }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(ItemContentForm)

