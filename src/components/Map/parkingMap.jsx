import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const ParkingMap = ({spot, name,id}) => {

 

  return (
    <div className='h-96 w-half overflow-hidden object-contain'>
      
      <MapContainer center={spot[0].split(",")} zoom={15}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
   
          <Marker key={id} position={spot[0].split(",")} children={<p>sdasdas</p>}>
            <Popup content={"<p>sadas</p>"} children={<p>asdad</p>} />
          </Marker>
   
      </MapContainer>
    </div>
  );
};

export default ParkingMap;
