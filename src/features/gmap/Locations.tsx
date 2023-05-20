import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { tiendaT } from '../../util/types';
import { Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setLocation } from '../location/locationSlice';
import { useGetLocationsQuery } from '../../features/api/apiSlice';


const KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
let GOOGLE_MAPS_API_KEY: string;
if (KEY) GOOGLE_MAPS_API_KEY = KEY;

const containerStyle = {
    width: '100%',
    height: '400px'
}


export default function Locations () {

    const {
        data: locations,
        isLoading,
        isSuccess,
        isError
    } = useGetLocationsQuery(undefined);

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY
    })

    const dispatch = useDispatch();

    function _setLocation (location: tiendaT) {
        dispatch(setLocation(location));
    }

    if (isLoading) return <p>LOADING LOCATIONS . . . . . .</p>
    else if (isSuccess) {

        const location0 = locations[0];

        const center = {
            lat: Number.parseFloat(location0.lat),
            lng: Number.parseFloat(location0.lng)
        }
    
        if ( ! GOOGLE_MAPS_API_KEY) return <p>API_KEY not loaded!!</p>
    
        if (loadError) {
            return <div>Map cannot be loaded right now, sorry.</div>
        }

        return isLoaded ? (
            <Paper>
                <GoogleMap zoom={8}
                    mapContainerStyle={containerStyle}
                    center={center}>

                    {locations.map((_location: tiendaT) => 
                        <MarkerF key={_location.id}
                            title={_location.titulo}
                            position={{
                                lat: Number.parseFloat(_location.lat),
                                lng: Number.parseFloat(_location.lng)
                            }}
                            onClick={() => _setLocation(_location)}/>
                    )}
                </GoogleMap>
            </Paper>
        ) : <p>Loading map ....</p>
    }
    else if (isError) return <p>ERROR!!</p>
    else return <p>PAGINA NO CARGADA.</p>
}

