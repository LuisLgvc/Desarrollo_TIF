/* import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/spotixImg.png";

function Login() {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth("actions");

    function handleSubmit(event) {
        event.preventDefault();
        if (!isLoading) {
            setIsLoading(true);
            fetch(`${import.meta.env.VITE_API_BASE_URL}api-auth/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: usernameRef.current.value,
                    password: passwordRef.current.value,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("No se pudo iniciar sesión");
                    }
                    return response.json();
                })
                .then((responseData) => {
                    if (responseData.token) {
                        login(responseData.token);
                    } else {
                        setIsError(true);
                    }
                })
                .catch(() => {
                    setIsError(true);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }

    return (
        <section className="section is-flex is-align-items-center" style={{ minHeight: "100vh" }}>
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-6-tablet is-4-desktop is-3-widescreen">
                        <div className="box has-shadow has-text-centered">
                            <figure className="image is-128x128 is-inline-block">
                                <img src={logo} alt="Logo" />
                            </figure>
                            <form onSubmit={handleSubmit}>
                                <div className="field">
                                    <label htmlFor="username" className="label">
                                        Nombre de usuario:
                                    </label>
                                    <div className="control has-icons-left">
                                        <input
                                            className="input"
                                            type="text"
                                            id="username"
                                            name="username"
                                            ref={usernameRef}
                                            required
                                        />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-user"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="password" className="label">
                                        Contraseña:
                                    </label>
                                    <div className="control has-icons-left">
                                        <input
                                            className="input"
                                            type="password"
                                            id="password"
                                            name="password"
                                            ref={passwordRef}
                                            required
                                        />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <button type="submit" className="button is-primary is-fullwidth">
                                            Enviar
                                        </button>
                                        {isLoading && <p>Cargando...</p>}
                                        {isError && <p>Error al iniciar sesión.</p>}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
 */

import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import logo from "../../assets/spotixImg.png";

function Login() {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth("actions");

    function handleSubmit(event) {
        event.preventDefault();
        if (!isLoading) {
            setIsLoading(true);
            fetch(`${import.meta.env.VITE_API_BASE_URL}api-auth/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: usernameRef.current.value,
                    password: passwordRef.current.value,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("No se pudo iniciar sesión");
                    }
                    return response.json();
                })
                .then((responseData) => {
                    if (responseData.token) {
                        login(responseData.token);
                    } else {
                        setIsError(true);
                    }
                })
                .catch(() => {
                    setIsError(true);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '80vh',
                bgcolor: 'grey.200',
                borderRadius: 2,
                p: 4,
                mt: '10vh', // Para centrar verticalmente
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <img src={logo} alt="Logo" style={{ marginBottom: '1rem' }} />
                <Typography variant="h5" component="h1" gutterBottom>
                    Iniciar Sesión
                </Typography>
                <TextField
                    label="Username"
                    inputRef={usernameRef}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Password"
                    type="password"
                    inputRef={passwordRef}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                {isError && (
                    <Typography color="error" variant="body2">
                        Error al iniciar sesión
                    </Typography>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                        mt: 2,
                        borderRadius: 2,
                        bgcolor: 'purple',
                        '&:hover': {
                            bgcolor: 'darkpurple',
                        },
                    }}
                    disabled={isLoading}
                >
                    {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
                </Button>
            </Box>
        </Container>
    );
}

export default Login;