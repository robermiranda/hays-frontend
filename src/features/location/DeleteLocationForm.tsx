import { useEffect, useState, ChangeEvent } from 'react';
import { Grid, TextField, Typography } from "@mui/material";
import { Button, Paper } from "@mui/material";
import { deleteTienda } from '../../util/net';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { tiendaListState, tiendaListAtom } from '../../util/state';


export default function DeleteLocationForm () {

    const [tiendaId, setTiendaId] = useState<string>("");
    const [disabled, setDisabled] = useState<boolean>(true);
    const [message, setMessage] = useState<string>("");
    const setTiendaList = useSetRecoilState(tiendaListState);
    const tiendaList = useRecoilValue(tiendaListAtom);

    useEffect(() => {
        setMessage("");
    }, []);

    function handleOnChange (event: ChangeEvent<HTMLInputElement>): void {
        
        const id = event.target.value;

        setTiendaId(id);

        if (id.length === 0) setDisabled(true);
        else setDisabled(false);
    }

    function createLocationHandler () {
        setMessage("");
        deleteTienda(tiendaId)
        .then(response => {
            if (response) {
                const tiendaListCopy = [...tiendaList];
                const index = tiendaListCopy.findIndex(tienda => tienda.id === tiendaId);
                if (index >= 0) {
                    tiendaListCopy.splice(index, 1);
                    setTiendaList(tiendaListCopy);
                }
                setMessage(`Location deleted`);
                setTiendaId("");
            }
            else setMessage('Location NOT deleted');
        })
        .catch(error => {
            console.error('ERROR in DeleteLocationForm component');
        })
        .finally(() => setDisabled(true));
    }

    return <Paper elevation={6} sx={{mb: 6}}>
        <Typography variant="h6"
            style={{color:"#0C2453"}}
            align="center"
            py={2}>
            
            Delete Location
        </Typography>
        <Grid container spacing={4} p={2}>
            <Grid item xs={12} md={4}>
                <TextField type="text"
                    name="id"
                    label="id *"
                    value={tiendaId}
                    onChange={handleOnChange}
                    variant="standard"
                    fullWidth />
            </Grid>
            <Grid item xs={12} md={4}>
                <Button variant="outlined"
                    size="large"
                    disabled={disabled}
                    onClick={createLocationHandler}>

                    Delete Location
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