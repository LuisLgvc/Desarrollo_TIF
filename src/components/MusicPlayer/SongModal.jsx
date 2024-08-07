// import React from 'react';
// import { Modal, Box, Typography, IconButton, Button } from '@mui/material';
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
// };

// function SongModal({ open, handleClose, song }) {
//     if (!song) return null;

//     const handlePrintTitle = () => {
//         console.log(song.id);
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
                // <Typography variant="h6" component="h2">
                //     {song.title}
                // </Typography>
                // <Typography sx={{ mt: 2 }}>
                //     Artista: {song.artistName || 'Desconocido'}
                // </Typography>
                // <Typography sx={{ mt: 2 }}>
                //     Año: {song.year || 'Desconocido'}
                // </Typography>
                // <Typography sx={{ mt: 2 }}>
                //     Duración: {song.duration ? `${song.duration} segundos` : 'Desconocido'}
                // </Typography>
                // {song.song_file && (
                //     <audio controls style={{ width: '100%', marginTop: '20px' }}>
                //         <source src={song.song_file} type="audio/mpeg" />
                //         Tu navegador no soporta el elemento de audio.
                //     </audio>
                // )}
//                 <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
//                     <Button
//                         onClick={handlePrintTitle}
//                         variant="contained"
//                         sx={{ backgroundColor: '#1FDF64', '&:hover': { backgroundColor: '#189945' } }}
//                     >
//                         Actualizar
//                     </Button>
//                 </Box>
//             </Box>
//         </Modal>
//     );
// }

// export default SongModal;


import React from 'react';
import { Modal, Box, Typography, IconButton, Button } from '@mui/material';
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

function SongModal({ open, handleClose, song, handleOpenEdit }) {
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
                    {song.title}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Artista: {song.artistName || 'Desconocido'}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Año: {song.year || 'Desconocido'}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Duración: {song.duration ? `${song.duration} segundos` : 'Desconocido'}
                </Typography>
                {song.song_file && (
                    <audio controls style={{ width: '100%', marginTop: '20px' }}>
                        <source src={song.song_file} type="audio/mpeg" />
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenEdit}
                    sx={{ mt: 2, backgroundColor: '#1FDF64', '&:hover': { backgroundColor: '#189945' } }}
                >
                    Editar
                </Button>
            </Box>
        </Modal>
    );
}

export default SongModal;
