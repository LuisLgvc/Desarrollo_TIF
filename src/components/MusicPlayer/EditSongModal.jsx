// import React, { useState } from 'react';
// import { Modal, Box, Typography, IconButton, TextField, Button } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     boxShadow: 24,
//     p: 4,
//     borderRadius: '10px',
//     border: '2px solid #000',
// };

// function EditSongModal({ open, handleClose, song, token, onSave }) {
//     const [formData, setFormData] = useState({
//         title: song.title,
//         year: song.year,
//     });
//     const [songFile, setSongFile] = useState(null);

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleFileChange = (event) => {
//         setSongFile(event.target.files[0]);
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const newForm = new FormData();
//         newForm.append('title', formData.title);
//         newForm.append('year', formData.year);
//         if (songFile) {
//             newForm.append('song_file', songFile);
//         }

//         try {
//             const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/${song.id}/`, {
//                 method: 'PATCH',
//                 headers: {
//                     Authorization: `Token ${token}`,
//                 },
//                 body: newForm,
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             onSave(data);
//             handleClose();
//         } catch (error) {
//             console.error('Error updating song:', error);
//         }
//     };

//     return (
//         <Modal open={open} onClose={handleClose}>
//             <Box sx={style}>
//                 <IconButton
//                     aria-label="close"
//                     onClick={handleClose}
//                     sx={{
//                         position: 'absolute',
//                         right: 8,
//                         top: 8,
//                         color: (theme) => theme.palette.grey[500],
//                     }}
//                 >
//                     <CloseIcon />
//                 </IconButton>
//                 <Typography variant="h6" component="h2">
//                     Actualizar Canción
//                 </Typography>
//                 <form onSubmit={handleSubmit}>
//                     <TextField
//                         label="Título"
//                         name="title"
//                         value={formData.title}
//                         onChange={handleInputChange}
//                         fullWidth
//                         margin="normal"
//                         required
//                     />
//                     <TextField
//                         label="Año de lanzamiento"
//                         name="year"
//                         type="number"
//                         value={formData.year}
//                         onChange={handleInputChange}
//                         fullWidth
//                         margin="normal"
//                     />
//                     <Button
//                         variant="contained"
//                         component="label"
//                         fullWidth
//                         sx={{ mt: 2 }}
//                     >
//                         Subir Archivo de Canción
//                         <input
//                             type="file"
//                             hidden
//                             accept="audio/*"
//                             onChange={handleFileChange}
//                         />
//                     </Button>
//                     {songFile && (
//                         <Typography variant="body2" sx={{ mt: 2 }}>
//                             Archivo seleccionado: {songFile.name}
//                         </Typography>
//                     )}
//                     <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
//                         <Button
//                             type="submit"
//                             variant="contained"
//                             color="primary"
//                             sx={{ backgroundColor: '#1FDF64', '&:hover': { backgroundColor: '#189945' } }}
//                         >
//                             Guardar
//                         </Button>
//                     </Box>
//                 </form>
//             </Box>
//         </Modal>
//     );
// }

// export default EditSongModal;


// import React, { useState } from 'react';
// import { Modal, Box, Typography, IconButton, TextField, Button } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     boxShadow: 24,
//     p: 4,
//     borderRadius: '10px',
//     border: '2px solid #000',
// };

// function EditSongModal({ open, handleClose, song, token, onSave }) {
//     const [formData, setFormData] = useState({
//         title: song.title,
//         artistName: song.artistName,
//         year: song.year,
//         duration: song.duration,
//         song_file: song.song_file,
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({ ...prevData, [name]: value }));
//     };

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         setFormData((prevData) => ({ ...prevData, song_file: file }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onSave({ ...formData, id: song.id });
//     };

//     return (
//         <Modal open={open} onClose={handleClose}>
//             <Box sx={style}>
//                 <IconButton
//                     aria-label="close"
//                     onClick={handleClose}
//                     sx={{
//                         position: 'absolute',
//                         right: 8,
//                         top: 8,
//                         color: (theme) => theme.palette.grey[500],
//                     }}
//                 >
//                     <CloseIcon />
//                 </IconButton>
//                 <Typography variant="h6" component="h2">
//                     Editar Canción
//                 </Typography>
//                 <form onSubmit={handleSubmit}>
//                     <TextField
//                         label="Título"
//                         name="title"
//                         value={formData.title}
//                         onChange={handleInputChange}
//                         fullWidth
//                         margin="normal"
//                         required
//                     />
//                     <TextField
//                         label="Año de lanzamiento"
//                         name="year"
//                         type="number"
//                         value={formData.year}
//                         onChange={handleInputChange}
//                         fullWidth
//                         margin="normal"
//                     />
//                     <Button
//                         variant="contained"
//                         component="label"
//                         fullWidth
//                         sx={{ mt: 2 }}
//                     >
//                         Subir Archivo de Canción
//                         <input
//                             type="file"
//                             hidden
//                             accept="audio/*"
//                             onChange={handleFileChange}
//                         />
//                     </Button>
//                     {formData.song_file && (
//                         <Typography variant="body2" sx={{ mt: 2 }}>
//                             Archivo seleccionado: {formData.song_file.name}
//                         </Typography>
//                     )}
//                     <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
//                         <Button
//                             type="submit"
//                             variant="contained"
//                             color="primary"
//                             sx={{ backgroundColor: '#1FDF64', '&:hover': { backgroundColor: '#189945' } }}
//                         >
//                             Guardar
//                         </Button>
//                     </Box>
//                 </form>
//             </Box>
//         </Modal>
//     );
// }

// export default EditSongModal;

import React, { useState } from 'react';
import { Modal, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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

function EditSongModal({ open, handleClose, song, token, onSave }) {
    const [formData, setFormData] = useState({
        id: song.id,
        title: song.title,
        year: song.year,
        song_file: song.song_file,
        owner: song.owner,
    });
    const [songFile, setSongFile] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        setSongFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedForm = new FormData();
        updatedForm.append('id', formData.id);
        updatedForm.append('title', formData.title);
        updatedForm.append('year', formData.year);
        updatedForm.append('owner', formData.owner);
        if (songFile) {
            updatedForm.append('song_file', songFile);
        }

        onSave(updatedForm);
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box component="form" onSubmit={handleSubmit} sx={style}>
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
                    Editar Canción
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Título"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="year"
                    label="Año"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                />
                <Button
                    variant="contained"
                    component="label"
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
                {songFile && (
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Archivo seleccionado: {songFile.name}
                    </Typography>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ backgroundColor: '#1FDF64', '&:hover': { backgroundColor: '#189945' } }}
                    >
                        Guardar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default EditSongModal;