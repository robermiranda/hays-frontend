import { Box, Grid } from '@mui/material'
import AppBar from './ResponsiveAppBar';


type Props = {
    children?: React.ReactNode;
};

export default function Layout ({children}: Props) {
    return (    
        <Box p={2}>
            <Grid container
                spacing={4}
                direction="column"
                px={{md: 10}}>
                
                <Grid item xs={12}>
                    <AppBar />
                </Grid>
                <Grid item xs={12}>
                    {children}
                </Grid>
            </Grid>
        </Box>
    );
}