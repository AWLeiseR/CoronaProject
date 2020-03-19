import React,{useState,createRef} from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import getUbsList from '../utils/fetchUBS'

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

    

    const updatePos=(event)=>{
      let aux=event.target.getLatLng()
      onchangelatMarker(aux.lat)
      onchangelongMarker(aux.lng)
      //console.log(getUbsList(aux.lat,aux.long))
    }

    return (
        
        <Map center={position} zoom={mapa.zoom} style={{height:"100%", width: "100%"}}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={marker} draggable={true} onDragend={updatePos}>
          <Popup>
            Ubs here!
          </Popup>
        </Marker>
      </Map>
    )

}

export default MapUbs