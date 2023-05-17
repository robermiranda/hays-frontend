import { useEffect, useState, ChangeEvent } from 'react';
import { Grid, TextField, Typography } from "@mui/material";
import { Button, Paper } from "@mui/material";
import { tienda0, tiendaT } from '../../util/types';
import { updateTienda } from '../../util/net';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { tiendaListState, tiendaListAtom } from '../../util/state';

export default function UpadateLocationForm () {

    const [tienda, setTienda] = useState<tiendaT>(tienda0);
    const [disabled, setDisabled] = useState<boolean>(true);
    const [message, setMessage] = useState<string>("");

    const setTiendaList = useSetRecoilState(tiendaListState);
    const tiendaList = useRecoilValue(tiendaListAtom);

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

    function createLocationHandler () {
        setMessage("");
        updateTienda(tienda)
        .then(response => {
            if (response) {
                const tiendaListCopy = [...tiendaList];
                const tiendaFound = tiendaListCopy.find(t => t.id === tienda.id);
                if (tiendaFound) {
                    const tiendaCopy: tiendaT = {...tiendaFound}
                    if (tienda.titulo) tiendaCopy.titulo = tienda.titulo;
                    if (tienda.tipo) tiendaCopy.tipo = tienda.tipo;
                    if (tienda.gerente) tiendaCopy.gerente = tienda.gerente;
                    if (tienda.telefono) tiendaCopy.telefono = tienda.telefono;
                    if (tienda.direccion) tiendaCopy.direccion = tienda.direccion;
                    const index = tiendaListCopy.findIndex(t => t.id === tienda.id);
                    tiendaListCopy.splice(index, 1, tiendaCopy);
                    setTiendaList(tiendaListCopy);
                }
                setMessage(`Location updated`);
                setTienda(tienda0);
            }
            else setMessage('Location NOT updated');
        })
        .catch(error => {
            console.error('ERROR in UpdateLocationForm component',error);
        })
        .finally(() => setDisabled(true));
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
                    onClick={createLocationHandler}>

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