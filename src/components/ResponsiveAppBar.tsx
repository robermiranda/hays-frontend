import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link as RouterLink } from "react-router-dom";
import logo from '../media/haysLogo.png';


const pumasTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#0C2453',
        },
    },
});

const pages = [
    {
        name: 'List',
        url: '/list_locations'
    },
    {
        name: 'Admin',
        url: '/admin'
    },
    {
        name: 'Locations',
        url: 'locations'
    }
];

export default function ResponsiveAppBar () {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <ThemeProvider theme={pumasTheme}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <RouterLink to="/">
                            <img src={logo} alt="Logo Pumas" width="35"/>
                        </RouterLink>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit">

                                <MenuIcon />
                            </IconButton>
                            <Menu id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}>

                                {pages.map((page) => (
                                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                        <Link component={RouterLink} to={page.url}
                                            sx={{
                                                textDecoration:"none",
                                                color:"inherit"
                                            }}>
                                        
                                            {page.name}
                                        </Link>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}>
                                    <Link component={RouterLink} to={page.url}
                                        sx={{
                                            textDecoration:"none",
                                            color:"inherit"
                                        }}>
                                    
                                        {page.name}
                                    </Link>
                            </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
};
