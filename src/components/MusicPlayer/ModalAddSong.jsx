import React, { useState } from 'react';
import { Modal, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
    border: '2px solid #000',
};

function ModalAddSong({ open, handleClose, onSave }) {
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        year: '',
        duration: '',
    });
    const [songFile, setSongFile] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (event) => {
        setSongFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newForm = new FormData();
        newForm.append('title', formData.title);
        newForm.append('artist', formData.artist);
        newForm.append('year', formData.year);
        newForm.append('duration', formData.duration);
        if (songFile) {
            newForm.append('song_file', songFile);
        }
        onSave(newForm);
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" component="h2">
                    Agregar Canción
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Título"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Artista"
                        name="artist"
                        value={formData.artist}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Año"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Duración"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Subir Archivo de Canción
                        <input
                            type="file"
                            hidden
                            accept="audio/*"
                            onChange={handleFileChange}
                        />
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Guardar
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}

export default ModalAddSong;
