import { useEffect, useState, ChangeEvent } from 'react';
import { Grid, TextField, Typography } from "@mui/material";
import { Button, Paper } from "@mui/material";
import { useDeleteLocationMutation } from '../api/apiSlice';


export default function DeleteLocationForm () {

    const [tiendaId, setTiendaId] = useState<string>("");
    const [disabled, setDisabled] = useState<boolean>(true);
    const [message, setMessage] = useState<string>("");
    const [deleteLocation, {isLoading}]= useDeleteLocationMutation();

    useEffect(() => {
        setMessage("");
    }, []);

    function handleOnChange (event: ChangeEvent<HTMLInputElement>): void {
        
        const id = event.target.value;

        setTiendaId(id);

        if (id.length === 0) setDisabled(true);
        else setDisabled(false);
    }

    async function deleteLocationHandler () {
        setMessage("");
        try {
            if ( ! isLoading) { 
                const response = await deleteLocation(tiendaId).unwrap();

                if (response.status === 'ok') setMessage(`Location Deleted`);
                else setMessage('Location NOT Deleted');

                setTiendaId("");
            }
        }
        catch (error) {
            setMessage('ERROR. Location NOT Deleted');
            console.error('ERROR IN DELETE LOCATION HANDLER', error);
        }
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
                    onClick={deleteLocationHandler}>

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