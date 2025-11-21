import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logo from './Assets/Logo.png';
import { useNavigate } from "react-router-dom";
import {BACKGROUND,SECONDARY,PRIMARY,ACCENT} from '../Constants/Colors'
const pages = ['Solutions', 'Features', 'Intelligence', "About Us"];

function Header() {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState()
    const [anchorElUser, setAnchorElUser] = React.useState()

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (

        <AppBar position="static" sx={{ backgroundColor: BACKGROUND }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>

                    {/* Left: Logo */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img src={Logo} width="100px" height="100px" alt="logo" />
                    </Box>

                    {/* Center: Pages */}
                    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: PRIMARY, display: "block" }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {/* Right: Extra Buttons */}
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button variant="contained" color="secondary" onClick={() => navigate("/login")} sx={{ backgroundColor: PRIMARY }}>
                            Login
                        </Button>
                        <Button variant="outlined" sx={{ backgroundColor: SECONDARY }} onClick={() => navigate("/register")} color="inherit">
                            Sign Up
                        </Button>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>


    );
}
export default Header;
