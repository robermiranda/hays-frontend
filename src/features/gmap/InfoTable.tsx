import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { selectLocation } from '../location/locationSlice';


export default function InfoTable () {

    const location = useSelector(selectLocation);

    const keys = Object.keys(location);

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
                                {location[key]}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}