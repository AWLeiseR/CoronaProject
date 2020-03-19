import React,{useState,useEffect} from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import getUBSList from '../utils/fetchUBS';

//const aux={lat:-23.319088,lng :-51.157803}

function MapUbs(){

    const mapa = {
        lat:-23.306445, 
        lng: -51.168855,
        zoom: 12,
    }

    const [latMarker,onchangelatMarker]=useState(-23.319088)
    const [longMarker,onchangelongMarker]=useState(-51.157803)
    const position = [mapa.lat, mapa.lng]
    const marker=[latMarker,longMarker]
    const [ubsList, setUbsList] = useState([])
    
    const updatePos=(event)=>{
      let aux=event.target.getLatLng()
      onchangelatMarker(aux.lat)
      onchangelongMarker(aux.lng)
    }

    
    
    const searchUBS = () => {

        getUBSList(latMarker,longMarker).then(data => {
            setUbsList(data)
        })

    }

    return (
        <div style={{height:'100%'}}>
          <div onClick={searchUBS} style={{background:'#C34A3D',borderRadius:'10px',width:'130px',}}>
                <p>Pesquisar ubs</p>
            </div>
        <Map center={position} zoom={mapa.zoom} style={{height:"80%", width: "100%"}}>
            <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {ubsList.map(item=>{
              return <Marker key={item.display_name} position={[item.lat,item.lon]}></Marker>
            })}
            <Marker  position={marker} draggable={true} onDragend={updatePos}>
            <Popup>
            
            </Popup>
        </Marker>
        
      </Map>
      </div>
      
    )

}

export default MapUbs