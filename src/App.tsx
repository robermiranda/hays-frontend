import { RecoilRoot } from 'recoil';
import { Box } from '@mui/material';
import {
    BrowserRouter as Router,
    Route,
    Routes } from "react-router-dom";
import Admin from './features/location/Admin';
import Layout from './components/Layout';
import MapContainer from './features/gmap/MapContainer';
import TiendaList from './components/TiendaList';


export default function App() {

    return (        
        <RecoilRoot>
            <Box mx={{xs: 0.2, md: 2}} mt={{xs: 2, md: 4}}>
                <Router>
                    <Layout>
                        <Routes>
                            <Route path='/' element={ <p>Aqui la prueba técnica Hays!</p> }/>                            
                            <Route path='/list_locations' element={<TiendaList/>}/>
                            <Route path='/locations' element={<MapContainer/>}/>
                            <Route path='/admin' element={<Admin/>}/>
                            <Route path='*' element={<p>PÁGINA NO ENCONTRADA.</p>}/>
                        </Routes>
                    </Layout>
                </Router>
            </Box>
        </RecoilRoot>
    );
}
