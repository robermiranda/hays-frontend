import { useEffect, useState, ChangeEvent } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Grid, TextField, Typography } from "@mui/material";
import { Button, Paper } from "@mui/material";
import { tienda0, tiendaT } from '../../util/types';
import { postTienda } from '../../util/net';
import { tiendaListState, tiendaListAtom } from '../../util/state';

export default function NewLocationForm () {

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
                id: "",
                lat: tienda.lat,
                lng: tienda.lng,
                titulo: tienda.titulo,
                tipo: tienda.tipo,
                gerente: tienda.gerente,
                direccion: tienda.direccion,
                telefono: tienda.telefono,
            },
            [event.target.name]: event.target.value
        };

        setTienda(_tienda);

        if (_tienda.lat.length === 0 || _tienda.lng.length === 0) setDisabled(true);
        else setDisabled(false);
    }

    function createLocationHandler () {
        setMessage("");
        postTienda(tienda)
        .then(response => {
            if (response) {
                setMessage(`Location created with id ${response}`);
                const tiendaListCopy = [...tiendaList];
                tiendaListCopy.push({...tienda, id: response});
                setTiendaList(tiendaListCopy);
                setTienda(tienda0);
            }
            else setMessage('Location NOT created');
        })
        .catch(error => {
            console.error('ERROR in NewLocationForm component');
        })
        .finally(() => setDisabled(true));
    }

    return (
        <Paper elevation={6} sx={{mb: 6}}>
            <Typography variant="h6"
                style={{color:"#0C2453"}}
                align="center"
                py={2}>
                
                New Location Data
            </Typography>
            <Grid container spacing={4} p={2}>
                <Grid item xs={12} md={4}>
                    <TextField type="text"
                        name="lat"
                        label="Latitud *"
                        value={tienda.lat}
                        onChange={handleOnChange}
                        variant="standard"
                        fullWidth />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField type="text"
                        name="lng"
                        label="Longitud *"
                        value={tienda.lng}
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

                        Create Location
                    </Button>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography>
                        {message}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}