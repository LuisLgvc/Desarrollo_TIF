import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
/* import Link from '@mui/material/Link';*/
import { useAuth } from '../contexts/AuthContext';
import { IconButton, Button } from '@mui/material';

function Navbar() {
    const { isAuthenticated } = useAuth('state');
    const location = useLocation();

    // No mostrar el Navbar en la ruta de login
    if (location.pathname === '/login') {
        return null;
    }

    return (
        <AppBar position="static">
            <Toolbar>

                <IconButton
                    color="inherit"
                    size="large"
                    /* onClick={() => setOpen(true)} // Abre el drawer */
                    sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
                >
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>ICONBUTTON</Link>
                </IconButton>
                <Link color="inherit">
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
                </Link>
                <Link color="inherit">
                    <Link to="/albums" style={{ color: 'inherit', textDecoration: 'none' }}>Albums</Link>
                </Link>
                <Link color="inherit">
                    <Link to="/artists" style={{ color: 'inherit', textDecoration: 'none' }}>Artists</Link>
                </Link>
                <Link color="inherit">
                    <Link to="/genres" style={{ color: 'inherit', textDecoration: 'none' }}>Genres</Link>
                </Link>
                <Link color="inherit">
                    <Link to="/playlists" style={{ color: 'inherit', textDecoration: 'none' }}>Playlists</Link>
                </Link>
                <Link color="inherit">
                    {isAuthenticated ? (
                        <button onClick={() => useAuth('actions').logout()} style={{ color: 'inherit', textDecoration: 'none' }}>Logout</button>
                    ) : (
                        <Button to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>Iniciar Sesión</Button>
                    )}
                </Link>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;

/* 
return (
        <AppBar position="static" sx={{ backgroundColor: "#0F0F0F", maxWidth: "xl", margin: "auto" }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Box display={"flex"} alignItems={"center"}>
                    <IconButton
                        color="inherit"
                        size="large"
                        onClick={() => setOpen(true)} // Abre el drawer
                        sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        size="large"
                        sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
                    >
                        <MovieIcon />
                    </IconButton>
                    <Typography
                        variant="h1"
                        fontSize={20}
                        sx={{ cursor: "pointer" }}
                        onClick={() => navigate("/")}
                    >
                        MovieApp
                    </Typography>
                </Box>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Buscar…"
                        inputProps={{ "aria-label": "search" }}
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </Search>
                <Box display={{ xs: "none", sm: "none", md: "flex" }}>
                    {navLinks.map((item) => (
                        <MenuItem
                            key={item.title}
                            sx={{ ":hover": { backgroundColor: "#222" } }}
                            onClick={() => navigate(item.path)}
                        >
                            {item.title}
                            {item.badgeContent !== undefined && (
                                <Badge
                                    badgeContent={item.badgeContent}
                                    color="error"
                                    sx={{ marginLeft: 0.5 }}
                                >
                                    <FavoriteIcon color="inherit" />
                                </Badge>
                            )}
                        </MenuItem>
                    ))}
                </Box>
                <Drawer
                    open={open}
                    onClose={() => setOpen(false)}
                    sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
                >
                    <NavListDrawer navLinks={navLinks} />
                </Drawer>
            </Toolbar>
        </AppBar>
    );
*/