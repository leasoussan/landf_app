import '../../../css/MapMyContainer.css';
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents, Circle} from 'react-leaflet';
import { useState, useEffect } from 'react';
import {MultipleMarkerDisplay} from './MultipleMarkerDisplay';



export const DisplaySavedLocation = ({found_saved_location} ) => {
    const [position, setPosition] = useState(found_saved_location)
    
    useEffect(()=>{
        
    }, [])
    
    return(
        <>
        <div id="#map" style={{ width: '45vw', height: '45vh' }}>
        <MapContainer center={position} zoom={10} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
            <MultipleMarkerDisplay/>

          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <Circle
            center={position}
            pathOptions={{ fillColor: 'red' }}
            radius={1000}
            stroke={true}
          />
        </MapContainer>
        </div>
        </>
      )
}



export default DisplaySavedLocation





