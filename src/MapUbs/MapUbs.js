import React from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

function MapUbs(){

    const mapa = {
        lat: 51.505,
        lng: -0.09,
        zoom: 13,
    }

    const position = [mapa.lat, mapa.lng]

    return (
        
        <Map center={position} zoom={mapa.zoom} style={{height:"100%", width: "100%"}}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    )

}

export default MapUbs