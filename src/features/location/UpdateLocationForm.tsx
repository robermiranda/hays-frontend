import { useEffect, useState, ChangeEvent } from 'react';
import { Grid, TextField, Typography } from "@mui/material";
import { Button, Paper } from "@mui/material";
import { tienda0, tiendaT } from '../../util/types';
import { useUpdateLocationMutation } from '../api/apiSlice';

export default function UpadateLocationForm () {

    const [tienda, setTienda] = useState<tiendaT>(tienda0);
    const [disabled, setDisabled] = useState<boolean>(true);
    const [message, setMessage] = useState<string>("");
    const [updateLocation, mutResponse] = useUpdateLocationMutation();

    useEffect(() => {
        setMessage("");
    }, []);

    function handleOnChange (event: ChangeEvent<HTMLInputElement>): void {
        
        const _tienda: tiendaT = {
            ...{
                id: tienda.id,
                lat: "",
                lng: "",
                titulo: tienda.titulo,
                tipo: tienda.tipo,
                gerente: tienda.gerente,
                direccion: tienda.direccion,
                telefono: tienda.telefono,
            },
            [event.target.name]: event.target.value
        };

        setTienda(_tienda);

        if (_tienda.id.length === 0) setDisabled(true);
        else setDisabled(false);
    }

    async function updateLocationHandler () {
        setMessage("");
        if ( ! mutResponse.isLoading) {
            try {
                const response = await updateLocation(tienda).unwrap();
                
                if (response.status === 'ok') setMessage(`Location Updated`);
                else setMessage('Location NOT Updated');

                setTienda(tienda0);
            }
            catch (error) {
                setMessage('ERROR. Location NOT updated');
                console.error('ERROR in UpdateLocationForm component',error);
            }
            finally {
                setDisabled(true);
            }
        }
    }

    return <Paper elevation={6} sx={{mb: 6}}>
        <Typography variant="h6"
            style={{color:"#0C2453"}}
            align="center"
            py={2}>
            
            Update Location Data
        </Typography>
        <Grid container spacing={4} p={2}>
            <Grid item xs={12} md={4}>
                <TextField type="text"
                    name="id"
                    label="id *"
                    value={tienda.id}
                    onChange={handleOnChange}
                    variant="standard"
                    fullWidth />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextField type="text"
                    name="titulo"
                    label="Titulo"
                    value={tienda.titulo}
                    onChange={handleOnChange}
                    variant="standard"
                    fullWidth />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextField type="text"
                    name="tipo"
                    label="Tipo"
                    value={tienda.tipo}
                    onChange={handleOnChange}
                    variant="standard"
                    fullWidth />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextField type="text"
                    name="gerente"
                    label="Gerente"
                    value={tienda.gerente}
                    onChange={handleOnChange}
                    variant="standard"
                    fullWidth />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextField type="text"
                    name="telefono"
                    label="Teléfono"
                    value={tienda.telefono}
                    onChange={handleOnChange}
                    variant="standard"
                    fullWidth />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextField type="text"
                    name="direccion"
                    label="Dirección"
                    value={tienda.direccion}
                    onChange={handleOnChange}
                    variant="standard"
                    fullWidth />
            </Grid>
            <Grid item xs={12} md={4}>
                <Button variant="outlined"
                    size="large"
                    disabled={disabled}
                    onClick={updateLocationHandler}>

                    Update Location
                </Button>
            </Grid>
            <Grid item xs={12} md={4}>
                <Typography>
                    {message}
                </Typography>
            </Grid>
        </Grid>
    </Paper>
}