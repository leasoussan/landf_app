import '../../../css/MapMyContainer.css';
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvent, Circle} from 'react-leaflet';
import { useState, useEffect } from 'react';
import {Icon} from 'leaflet'


export const MultipleMarkerDisplay = () => {
    
    const arrCoordinates = [['32.0582756','34.7672691'], ['32.0582700','34.7672711'],['32.0582785','34.7672691'],['32.0582756','34.7672622']]

    const [markerInRadius, setmarkerInRadius] = useState([])
    
    useEffect(()=>{
        console.log("holioooaa");
    })


    const map = useMapEvent({
        click(){
            map.locate()
        }
    })
    return arrCoordinates.map((marker_item, i) => {
        return(
            <div key={i}>

            <Marker position={marker_item}/>
            </div>
        )
        
    })

}



export default MultipleMarkerDisplay





