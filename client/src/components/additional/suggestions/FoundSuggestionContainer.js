import '../../../css/Suggestion.css'
import { useState, useEffect } from "react"
import ItemContentForm from '../../../tools.js/ItemContentForm.js';
import Button from 'react-bootstrap/esm/Button';
import Accordion from 'react-bootstrap/Accordion';
import ItemIdentificationForm from '../../../tools.js/ItemIdentificationForm.js';
import CheckItemMatch from '../../items/CheckItemMatch';





const FoundSuggestionContainer = (props) => {
    
    const [ ItemContent, setItemContent ] = useState('')



    useEffect(() =>{

        try{
           
            const get_item_context = async()=>{
                const item_id = props.item.id
                const check_db = await fetch(`item_content_detail/${item_id}` )
                const res = await check_db.json()
                console.log("log the matters here", res);
                  
               };get_item_context()

        }
        catch(e){
            console.log(e);
        }

    })


   

    return (
        <Accordion >
            <Accordion.Item eventKey="0">
                <Accordion.Header>Add Details about what you found:</Accordion.Header>
                <Accordion.Body className='suggestion_accordion_body'>

                    <CheckItemMatch/>
                <UserFoundMatchSuggestion item={props.item} />


                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

// FOUND MATCH SUGGESTION is to match LOST item to someone that FOUND an ITEM 
// user will get a breif description of the item he gave us, and would be asked few questions to help identify the item 
//  he will have anotification form type: descriptive_detail
// the form will ask if there is content if yes 
// add contente via category and sub category and color  and brand

export const UserFoundMatchSuggestion = (props) => {
    const [foundSugestion, setFoundSuggestion] = useState('');
    
    try{
          
        const item_id = props.item.id
        const get_item_context = async()=>{
                console.log("item_id", item_id);
         
            const check_db = await fetch(`item_content_detail/${item_id}` )
            const res = await check_db.json()
            console.log("log the matters here", res);
              
           };get_item_context()

    }
    catch(e){
        console.log(e);
    }



    return (
        <>



            <div className="foundSuggestion">
             
                <div className='suggestion_box'>
                    <h4>Describe content of Item</h4>
                
                    <ItemContentForm item={props.item}/>

                </div>
                <div className='identification_box'>
                    <h5>Do you see any Identification on it, ie: Phone Number, Name ...</h5>
                    <ItemIdentificationForm item={props.item}/>

                </div>

            </div>


        </>
    )



}

 





export default FoundSuggestionContainer;