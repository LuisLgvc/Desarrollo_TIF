import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import defaultImage from '../../assets/notFoundImg.png'; // Asegúrate de que la ruta sea correcta

function SongCard({ song, onClick }) {
    return (
        <Card 
            onClick={onClick} 
            sx={{
                backgroundColor: 'black',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(255, 255, 255, 0.2)',
                color: 'white',
                transition: 'transform 0.2s', // Añade una transición para el efecto de crecimiento
                '&:hover': {
                    transform: 'scale(1.02)', // Efecto de crecimiento al pasar el ratón
                },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%', // Asegura que la carta ocupe todo el espacio disponible
            }}
        >
            <CardMedia
                component="img"
                height="150" // Mantén la altura de la imagen
                image={defaultImage}
                alt="default"
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div">
                    {song.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {song.artist}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default SongCard;