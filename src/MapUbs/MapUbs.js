import React,{useState,useEffect} from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import getUBSList from '../utils/fetchUBS';

const aux={lat:-23.319088,lng :-51.157803}

function MapUbs(){

    const mapa = {
        lat:-23.319088,
        lng: -51.157803,
        zoom: 13,
    }

    const [latMarker,onchangelatMarker]=useState(-23.319088)
    const [longMarker,onchangelongMarker]=useState(-51.157803)
    const position = [mapa.lat, mapa.lng]
    const marker=[latMarker,longMarker]
    const [ubsList,onchangeUbs]=[]
    
    const updatePos=(event)=>{
      let aux=event.target.getLatLng()
      onchangelatMarker(aux.lat)
      onchangelongMarker(aux.lng)
    }

    return (
        
        <Map center={position} zoom={mapa.zoom} style={{height:"80%", width: "100%"}}>
            <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={marker} draggable={true} onDragend={updatePos}>
            <Popup>
            
            </Popup>
        </Marker>
        
      </Map>
      
    )

}

function MapPage(){

    const [ubsList, setUbsList] = useState([])
    
    const searchUBS = () => {

        getUBSList(aux.lat, aux.lng).then(data => {
            setUbsList(data)
        })

    }

    return(
        <div style={{height:'100%'}}>

            <MapUbs/> 
            <div onClick={searchUBS} style={{background:'#C34A3D',borderRadius:'10px',width:'130px',}}>
                <p>Pesquisar ubs</p>
            </div>

            {ubsList.map(item => {
                return <p>ubs-> {item.display_name}</p>
            })}
        </div>
    )
}

export default MapPage