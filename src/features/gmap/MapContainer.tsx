import { Grid } from "@mui/material";
import Locations from "./Locations";
import InfoTable from "./InfoTable";


export default function MapContainer (props: any) {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
                <Locations/>
            </Grid>
            <Grid item xs={12} md={4}>
                <InfoTable/>
            </Grid>
        </Grid>
    );
}