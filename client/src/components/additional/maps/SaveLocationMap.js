
import '../../../css/MapMyContainer.css';
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents, Circle} from 'react-leaflet';
// import getRadius from 'leaflet'

// import LocationMarker from './LocationMarker.js';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


// My App container is the Map Componenet with a Child LocationMarker
// the Map need a location to display 
// The location marker will give us "location "
// this location will go up to the Parent Map
// Map componenet is passing data position when called
function SaveLocationMap({saved_position}) {
    const [position, setPosition] = useState(false);
    const [areaLocator, setAreaLocator] = useState(false);
    const [show, setShow] = useState(false);

    // keep a check on the position of the marker
    useEffect(()=>{
        console.log("saved position from mapo CO");
        saved_position(position);

    },[position])


    // here we take the props location and we set it in the state
    const found_location = (location) => {
        console.log("location", location);
        setPosition(location)
    }

    const lost_item_location = (address, prevAddress)=>{
        setAreaLocator(address)
    }

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
export default SaveLocationMap



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

    console.log("we are here")
    return position === null ? 'There is No Position' : (
        <Marker position={position}>
            <Popup>Item Found</Popup>
        </Marker>
    )

}
