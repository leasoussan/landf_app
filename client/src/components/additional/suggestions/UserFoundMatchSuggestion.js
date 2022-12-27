import '../../../css/Suggestion.css'
import { useState, useEffect } from "react"
import ItemContentForm from '../../../tools.js/ItemContentForm.js';
import Button from 'react-bootstrap/esm/Button';
import Accordion from 'react-bootstrap/Accordion';

// FOUND MATCH SUGGESTION is to match LOST item to someone that FOUND an ITEM 
// user will get a breif description of the item he gave us, and would be asked few questions to help identify the item 
//  he will have anotification form type: descriptive_detail
// the form will ask if there is content if yes 
// add contente via category and sub category and color  and brand

export const UserFoundMatchSuggestion = (props) => {
    const [foundSugestion, setFoundSuggestion] = useState('');

    useEffect(() => {
        try {
            // console.log("What do I have here props", this.props);
        }
        catch (e) {
            console.log(e);
        }

    }, [])

    const chec=()=>{
                    console.log("What do I have here props", props.item);
 
    };
    chec()
    



    return (
        <>
            <div className="foundSuggestion">
                <h4> is it what you are looking for? </h4>
                <div className='suggestion_box'>
                    <h3>a sec to help for a better match</h3>
                    <ItemContentForm />

                </div>

            </div>


        </>
    )



}

 


const sugestion_container = () => {
    return (
        <Accordion >
            <Accordion.Item eventKey="0">
                <Accordion.Header>Add Item Content</Accordion.Header>
                <Accordion.Body className='suggestion_accordion_body'>


                <UserFoundMatchSuggestion/>


                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default sugestion_container;