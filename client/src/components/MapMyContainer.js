// import { MapContainer } from 'react-leaflet/MapContainer'
// import { TileLayer } from 'react-leaflet/TileLayer'
// import { useMap } from 'react-leaflet/hooks'
import './MapMyContainer.css';
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from 'react-leaflet';
// import LocationMarker from './LocationMarker.js';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';



function MapMyContainer({saved_position}) {
    // const position = [51.505, -0.09]
    const [position, setPosition] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        saved_position(position);
    },[position])



    const found_location = (location) => {
        console.log("location", location);
        setPosition(location)
    }


    // const located_item = (e) => {
    //     const value = e.target.value;
    //     setPosition(value);
    //   }

    

    return (
        <>
            
               

                <div id="#map" style={{ width: '35vw', height: '35vh' }}>
                    <MapContainer
                        center={{ lat: 51.505, lng: -0.09 }}
                        zoom={13}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {/* <MyComponent/> */}
                        <LocationMarker found_location={found_location} />
                    </MapContainer>
                </div>
                {
                    position ? 
                    <Button variant="primary" onClick={()=> setPosition('')}>Change Location</Button> 
                    :
                    "Click on the Map To get Curretn Location"
                }
        
        </>
    )
}




export const LocationMarker = ({ found_location }) => {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
        click() {
            map.locate()
        },
        locationfound(e) {
            found_location(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },

    })

    return position === null ? null : (
        <Marker position={position}>
            <Popup>Item Found</Popup>
        </Marker>
    )

}



export default MapMyContainer





