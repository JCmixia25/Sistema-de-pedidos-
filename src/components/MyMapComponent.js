import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MyMapComponent = () => {
  const mapContainerStyle = {
    height: "400px",
    width: "100%",
  };

  const center = {
    lat: 14.651289, // Coordenadas de la dirección proporcionada
    lng: -90.5346901,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBfmbkdayH6BoZ6-mSoMcJ_7GYfImg_vg0">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={17} // Aumenta el zoom para ver mejor
      >
        {/* icono en mapa color rojo */}
        <Marker 
          position={center}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Icono rojo
            scaledSize: {
              width: 60,
              height: 60,
            }, // Tamaño del icono
          }} 
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default MyMapComponent;