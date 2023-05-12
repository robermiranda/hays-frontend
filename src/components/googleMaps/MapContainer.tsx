import { Grid } from "@mui/material";
import Locations from "./Locations";
import InfoTable from "./InfoTable";
import { useState } from "react";
import { tienda0, tiendaT } from "../../util/types";


export default function MapContainer (props: any) {

    const [info, setInfo] = useState<tiendaT>(tienda0);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
                <Locations setInfo={setInfo}/>
            </Grid>
            <Grid item xs={12} md={4}>
                <InfoTable info={info}/>
            </Grid>
        </Grid>
    );
}