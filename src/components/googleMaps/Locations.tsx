import { useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { Container } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { tiendaT } from '../../util/types';
import { tiendaListAtom } from '../../util/state';

const KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
let GOOGLE_MAPS_API_KEY: string;
if (KEY) GOOGLE_MAPS_API_KEY = KEY;

const containerStyle = {
    width: '800px',
    height: '400px'
}

export default function Locations () {

    const locations: tiendaT[] = useRecoilValue(tiendaListAtom);

    const location0: tiendaT = locations[0];

    const [info, setInfo] = useState<tiendaT>();

    
    const center = {
        lat: Number.parseFloat(location0.lat),
        lng: Number.parseFloat(location0.lng)
    }

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY
    })

    if ( ! GOOGLE_MAPS_API_KEY) return <p>API_KEY not loaded!!</p>

    if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>
    }

    const setDetalle = (location: tiendaT) => {
        
        setInfo(location);
    }

    return isLoaded ? (
        <Container>
            <GoogleMap zoom={8}
                mapContainerStyle={containerStyle}
                center={center}>

                {
                    locations.map((location: tiendaT) => 
                        <MarkerF title={location.titulo}
                            position={{
                                lat: Number.parseFloat(location.lat),
                                lng: Number.parseFloat(location.lng)
                            }}
                            onClick={(e) => setDetalle(location)}/>
                    )
                }
            </GoogleMap>
            <p>Titulo: {info?.titulo}</p>
            <p>Tipo: {info?.tipo}</p>
            <p>Gerente: {info?.gerente}</p>
            <p>Dirección: {info?.direccion}</p>
            <p>Teléfono: {info?.telefono}</p>
            <p>Id: {info?.id}</p>
        </Container>) : <p>Loading map ....</p>
}

