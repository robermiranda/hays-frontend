import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useGetLocationsQuery } from '../features/api/apiSlice';


export default function TiendaList () {

    const {
        data: locations,
        isLoading,
        isSuccess,
        isError
    } = useGetLocationsQuery(undefined);

    if (isLoading) return <p>LOADING LOCATIONS . . . . . .</p>
    else if (isSuccess) {

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
                    {locations.map((location: any) =>
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
        </TableContainer>)
    }
    else if (isError) return <p>ERROR!!</p>
    else return <p>PAGINA NO CARGADA.</p>;
}
