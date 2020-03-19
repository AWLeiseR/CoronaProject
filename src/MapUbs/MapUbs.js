import React,{useState,useEffect} from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import getUbsList from '../utils/fetchUBS'

const aux={lat:-23.319088,lng :-51.157803}

let ubsList=[]

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

    const displayUbs=()=>{
      if(ubsList!=undefined){
       return( ubsList.map(item=>(<Marker position={[item.lat,item.lon]}><Popup>
          
        </Popup></Marker>)))
      }
    }

    return (
        
        <Map center={position} zoom={mapa.zoom} style={{height:"80%", width: "100%"}}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {displayUbs()}
        <Marker position={marker} draggable={true} onDragend={updatePos}>
          <Popup>
          
          </Popup>
        </Marker>
        
      </Map>
      
    )

}

function pageMap(){
  

  const searchUbs=async ()=>{

    ubsList=await getUbsList(aux.lat,aux.lng)
    console.log(ubsList)
  }

  return(
    <div style={{height:'100%'}}>
      <MapUbs/>
      <div onClick={searchUbs} style={{background:'#C34A3D',borderRadius:'10px',width:'130px',}}>
      <p>Pesquisar ubs</p>
      {ubsList.map(item=>(<p>ubd-> {item.display_name}</p>))}
      </div>
      
    </div>
  )
}

export default pageMap