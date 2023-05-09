import { Box, Grid } from '@mui/material'
import AppBar from './ResponsiveAppBar';
import {  useRecoilValue, useSetRecoilState } from 'recoil';
import { tiendaListState, tiendaListAtom } from '../util/state';
import { useEffect } from 'react';

type Props = {
    children?: React.ReactNode;
};

export default function Layout ({children}: Props) {

    const tiendaList = useRecoilValue(tiendaListState);
    const setLocations  = useSetRecoilState(tiendaListAtom);
    
    useEffect(() => {
        setLocations(tiendaList);
    }, [tiendaList, setLocations]);
    

    return (
        <>
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
        </>
    )
}