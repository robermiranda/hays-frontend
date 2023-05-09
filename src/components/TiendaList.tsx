import { Box } from '@mui/material';
import { tiendaT } from '../util/types';
import {  useRecoilValue } from 'recoil';
import { tiendaListAtom } from '../util/state';


export default function TiendaList () {

    const locations = useRecoilValue(tiendaListAtom);
      
    return  <>
        <p>Lista de Tiendas.</p>
        {
            locations.map((tienda: tiendaT) =>
                <Box key={tienda.id} mb={2}>
                    <p>id: {tienda.id}</p>
                    <p>position: {tienda.lat}, {tienda.lng}</p>
                    <p>titulo: {tienda.titulo}</p>
                    <p>gerente: {tienda.gerente}</p>
                    <p>dirección: {tienda.direccion}</p>
                    <p>teléfono: {tienda.telefono}</p>
                    <p>tipo: {tienda.tipo}</p>
                    <br/>
                </Box>
            )
        }
    </>
}