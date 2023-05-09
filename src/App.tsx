import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { Box } from '@mui/material';
import {
    BrowserRouter as Router,
    Route,
    Routes } from "react-router-dom";
import TiendaList from './components/TiendaList';
import Admin from './components/admin/Admin';
import Layout from './components/Layout';
import Locations from './components/googleMaps/Locations';


export default function App() {

    return (        
        <RecoilRoot>
            <Suspense fallback={<p>Loading Data . . . . .</p>}>
                <Box mx={{xs: 0.2, md: 2}} mt={{xs: 2, md: 4}}>
                    <Router>
                        <Layout>
                            <Routes>
                                    <Route path='/' element={ <p>Aqui la prueba técnica Hays!</p> }/>                            
                                    <Route path='/list_locations' element={<TiendaList/>}/>
                                    <Route path='/locations' element={<Locations/>}/>
                                    <Route path='/admin' element={<Admin/>}/>
                                    <Route path='*' element={<p>PÁGINA NO ENCONTRADA.</p>}/>
                            </Routes>
                        </Layout>
                    </Router>
                </Box>
            </Suspense>
        </RecoilRoot>
    )
}
