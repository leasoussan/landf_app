import React, { Component } from 'react'
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MapMyContainer, { LocationMarker, SetLocationMarker, } from '../additional/maps/SaveLocationMap.js';
import { DisplaySavedLocation } from '../additional/maps/DisplaySavedLocation.js';
import ItemForm from './ItemForm.js';

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
    this.setState({ type: 'display_item' })
    const getItemDetail = async () => {
      try {
        const response = await fetch(`http://localhost:3001/item_detail/${this.props.item_id}`);
        const data = await response.json();
        // const item = Object.entries(data[0]);
        const item = data[0];

        //  const item = data[0].map((item,i )=> (item,i));

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
    console.log("hihih im here", e);
    this.setState({ type: 'edit_item' })

  }


  render() {
    const itemData = Object.entries(this.state.item_data)
    const type = this.state.type
    return (
      <>


        <Button key={this.props.item_id} className="me-2 mb-2" onClick={() => this.setState({ show: true })}>
          Detail
        </Button>

        <Modal show={this.state.show} fullscreen={true} onHide={() => { this.setState({ show: false }) }}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.item_id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            {type === 'display_item' ?
              <>

                <h1>Item Details </h1>
                <div key={this.item_id}>
                  <img src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-tools-hanging-on-wall-royalty-free-image-760251967-1563391812.jpg?crop=1.00xw:0.502xh;0,0.0561xh&resize=1200:*' />
                  <div>
                    {/* <h3>{(key.found_date).slice(0,10)}</h3> */}
                    <h3></h3>
                    <h3>{this.state.item_data.name}</h3>
                    <h3>{this.state.item_data.id}</h3>
                  </div>
                  <DisplaySavedLocation found_saved_location={this.state.location} />
                  <button onClick={this.handleEditItem}>EDIT ITEM</button>
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

const mapStateToProps = (state) => {

  return {
    store_load: state
    // user_id:state.user_id
  }
}


export default connect(mapStateToProps, null)(ItemDetail)