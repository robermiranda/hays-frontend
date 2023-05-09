import React from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { Container } from '@mui/material';

const KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
let GOOGLE_MAPS_API_KEY: string;
if (KEY) GOOGLE_MAPS_API_KEY = KEY;

const center = {
    lat: 19.445087,
    lng: -99.173365
}

const containerStyle = {
    width: '800px',
    height: '400px'
  }

export default function Locations () {

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY
    })

    if ( ! GOOGLE_MAPS_API_KEY) return <p>API_KEY not loaded!!</p>

    if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>
    }

    return isLoaded ? (
        <Container>
            <GoogleMap zoom={10}
                mapContainerStyle={containerStyle}
                center={center}>

                <MarkerF position={center} title="casita"/>
            </GoogleMap>
        </Container>) : <p>Loading map ....</p>
}

