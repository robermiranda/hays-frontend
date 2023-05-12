import { Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { tiendaT } from '../util/types';
import {  useRecoilValue } from 'recoil';
import { tiendaListAtom } from '../util/state';


export default function TiendaList () {

    const locations = useRecoilValue(tiendaListAtom);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="detail table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">LAT</TableCell>
                        <TableCell align="right">LNG</TableCell>
                        <TableCell align="right">TITULO</TableCell>
                        <TableCell align="right">TIPO</TableCell>
                        <TableCell align="right">GERENTE</TableCell>
                        <TableCell align="right">DIRECCIÓN</TableCell>
                        <TableCell align="right">TELÉFONO</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {locations.map((location: tiendaT) =>
                        <TableRow key={location.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                            <TableCell component="th" scope="row">
                                {location.id}
                            </TableCell>
                            <TableCell align="right">{location.lat}</TableCell>
                            <TableCell align="right">{location.lng}</TableCell>
                            <TableCell align="right">{location.titulo}</TableCell>
                            <TableCell align="right">{location.tipo}</TableCell>
                            <TableCell align="right">{location.gerente}</TableCell>
                            <TableCell align="right">{location.direccion}</TableCell>
                            <TableCell align="right">{location.telefono}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

/*
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

export default function InfoTable ({info}: any) {

    const keys = Object.keys(info);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="detail table">
                <TableHead>
                    <TableRow>
                        <TableCell>Property</TableCell>
                        <TableCell align="right">Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {keys.map((key: string) => (
                        <TableRow key={key}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                {key}
                            </TableCell>
                            <TableCell align="right">
                                {info[key]}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}*/