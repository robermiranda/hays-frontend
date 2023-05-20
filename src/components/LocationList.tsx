import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { locationResponseT, tiendaT } from '../util/types';
import { formateLocation } from '../features/util';
import { useGetLocationsQuery } from '../features/api/apiSlice';


function createData (props: tiendaT) {

    return {
        id: props.id,
        titulo: props.titulo,
        tipo: props.tipo,
        detalle: {
            lat: props.lat,
            lng: props.lng,
            gerente: props.gerente,
            direccion: props.direccion,
            telefono: props.telefono,
        }
    }
}

function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}>

                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
                {row.id}
            </TableCell>
            <TableCell align="right">{row.titulo}</TableCell>
            <TableCell align="right">{row.tipo}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        <Typography variant="h6" gutterBottom component="div">
                            DETALLE
                        </Typography>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>LAT</strong></TableCell>
                                    <TableCell><strong>LNG</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        {row.detalle.lat}
                                    </TableCell>
                                    <TableCell>{row.detalle.lng}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>GERENTE</strong></TableCell>
                                    <TableCell><strong>DIRECCIÓN</strong></TableCell>
                                    <TableCell><strong>TELÉFONO</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>{row.detalle.gerente}</TableCell>
                                    <TableCell>{row.detalle.direccion}</TableCell>
                                    <TableCell>{row.detalle.telefono}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
        </React.Fragment>
    );
}


export default function LocationList() {

    const {
        data: locations,
        isLoading,
        isSuccess,
        isError
    } = useGetLocationsQuery(undefined);

    if (isLoading) return <p>LOADING LOCATIONS . . . . . .</p>
    else if (isSuccess) {

        const _locations: tiendaT[] = locations.map((location: locationResponseT) => formateLocation(location));

        const rows: {id: string; titulo: string; tipo: string; detalle: any}[] = _locations.map((location: any) => createData(location));
        
        return (
            <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>ID</TableCell>
                        <TableCell align="right">TITULO</TableCell>
                        <TableCell align="right">TIPO</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.id} row={row} />
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
        );
    }
    else if (isError) return <p>ERROR!!</p>
    else return <p>PAGINA NO CARGADA.</p>;
}