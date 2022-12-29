
import Button from 'react-bootstrap/Button';
import { useEffect, useState, useContext } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/esm/Col';
import '../css/ItemContent.css'
import { connect } from 'react-redux';
import { AppContext } from '../App';
import { set_global_subCat_cat } from '../redux/actions.js';
import Colors from './Colors.js';



export const AddItemIdentification = (props) => {
    const { token, setToken, isCategory, setIsCategory } = useContext(AppContext)
    const [identifType,setIdentificationType] =useState('')
    useEffect(() => {
        const set_identification_type =()=>{
            const identificationType = ['first_name', 'last_name', 'credit_card', 'phone_number', 'address', 'company_name', 'other']
            const input_type = ''
            const identificationList = Object.entries(identificationType)
            
            identificationList.forEach(item=>  [item, input_type])
            console.log(identificationList);
           setIdentificationType(identificationList)
        };
        set_identification_type()
    }, [])

    
    


    const handleSelectChange = async (e) => {
        console.log(e);
        try {
            
            console.log(props.globalCat);
         
            }
        catch (e) {
            console.log(e);
        }
      
 


    const handleSubmit = (e) => {
        e.preventDefault();
        
    }
    
    }
    return (
        <>
            <div className='item_content_form'>



                <form className='add_item_form' >

                    <Col xs={12} md={5} lg={4} className='form_layout'>

                        <label> Select Identification type</label>
                        <select name='identification_detail' className='input_conatainer' title={"d"} onChange={handleSelectChange} >
                            {

                                    //      identifType.map((item,i) => {
                                    //         console.log(item,i);
                                    // return (
                                    //     <>
                                    //         <option key={`${i}`} value={item[0]} >{item[1]}</option>
                                    //     </>

                                    // )
                                // })
                            }

                        </select>
                       <input/>
                 
                    <Button type='submit' >BUTON</Button>
                    </Col>
                </form>


            </div>

        </>
    )


}







const ItemIdentificationForm = (props) => {
  
    return (
        <Accordion >
            <Accordion.Item eventKey="0">
                <Accordion.Header>Add Item Identification</Accordion.Header>
                <Accordion.Body>


                    <AddItemIdentification   />

                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}


const mapStateToProps = (state) => {
    console.log("this state", state);

    return {
      
    };

}


const mapDispatchToProps = (dispatch) => {
    return {

      
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(ItemIdentificationForm)