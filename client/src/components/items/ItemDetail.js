import React, { Component } from 'react'
import '../../css/ItemDetail.css'
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MapMyContainer, { LocationMarker, SetLocationMarker, } from '../additional/maps/SaveLocationMap.js';
import { DisplaySavedLocation } from '../additional/maps/DisplaySavedLocation.js';
import ItemForm from './ItemForm.js';
import { Link } from 'react-router-dom';
import CheckItemMatch from './CheckItemMatch.js';
import FoundSuggestionContainer from '../additional/suggestions/FoundSuggestionContainer.js';
import LostSuggestionContainer from '../additional/suggestions/LostSuggestionContainer.js';
import '../../css/Suggestion.css'

class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item_id: '',
      item_data: [],
      is_lost: '',
      is_found: '',
      resolved: '',
      suggested_match: [],
      show: false,
      location: '',
      type: ''
    }
  }

  componentDidMount() {
    this.setState({item_id: this.props.id})
    this.setState({ type: 'display_item' })
    const getItemDetail = async () => {
      try {
        const response = await fetch(`http://localhost:3001/item_detail/${this.props.item_id}`);
        const data = await response.json();
        const item = data[0];
        this.setState({ item_data: item });
        const lat = item.lat;
        const lng = item.len;
        this.setState({ location: [lat, lng] })
      }
      catch (e) {
        console.log(e);
      }
    };
    getItemDetail()
  }


  handleEditItem = (e) => {
    this.setState({ type: 'edit_item' })
  }

  
  handleDelete = (e) => {
    fetch(`http://localhost:3001/delete_item/${e.target.value}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            alert("item Deleted ")
        })
        .catch(e => console.log(e))
}

  render() {
    const type = this.state.type
    return (
      <>
   
        <Button className={"me-2 mb-2 item_display_clicked"} key={this.props.item_id} onClick={() => this.setState({ show: true })}>
        <img className='img_item_dashboard' src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-tools-hanging-on-wall-royalty-free-image-760251967-1563391812.jpg?crop=1.00xw:0.502xh;0,0.0561xh&resize=1200:*' />

              {type} <h3>{this.state.item_data.found_date}</h3>
        </Button>

        <Modal show={this.state.show} fullscreen={true} onHide={() => { this.setState({ show: false }) }}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.item_id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            {type === 'display_item' ?
              <>
              <div className='display_item_mainPanel'>
                <div className='display_item_modal'>
                 
                 
                 
                  <div className='Item_detail_display'>
                  <h1>Item Details </h1>
                  <h3>{(this.state.found_date)}</h3>
                 
                    <p>{this.state.item_data.name}</p>
                    <h3>{this.state.item_data.id}</h3>
                  </div>
                
            
                
                 <img className='image_item_detail' src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-tools-hanging-on-wall-royalty-free-image-760251967-1563391812.jpg?crop=1.00xw:0.502xh;0,0.0561xh&resize=1200:*' />
                  
              
                  

                  <div className='item_detail_map'>
                  <DisplaySavedLocation found_saved_location={this.state.location} />

                  </div>

               <div>
                  <button onClick={this.handleEditItem}>EDIT ITEM</button>
                  <button onClick={this.handleDelete} value={this.state.item_data.id}>DELET</button>
                </div>
                </div>

                <div className='Sugggestion_board'>

                 

                { 
                  !this.state.item_data.is_found ?
                      < LostSuggestionContainer item={this.state.item_data} userId={this.props.userId}/>
                       :
                       <>
                       <FoundSuggestionContainer item={this.state.item_data} userId={this.props.userId}/>

                       </>


                }
               
                </div>
                </div>


              </>
              :
              <>
                <h1> Edit Item </h1>
                <ItemForm type={type} item_data={this.state.item_data}/>
              </>
            }

          </Modal.Body>
        </Modal>
      </>
    )
  }
}




const mapStateToProps = (state, ownProps) => {
  return {
      token: state.token,
      global_categories: state.global_categories,
      global_sub_cat_per_cat: state.global_sub_cat_per_cat,

  }
}


const mapDispatchToProps = (dispatch) => {
  return {


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail)