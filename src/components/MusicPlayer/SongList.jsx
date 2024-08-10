import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import SongCard from './SongCard';
import SongModal from './SongModal';
import EditSongModal from './EditSongModal';
import AddSongModal from './AddSongModal';
import { useAuth } from '../../contexts/AuthContext';

function SongList() {
    const { token } = useAuth("state");

    const [songs, setSongs] = useState([]);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [nextUrl, setNextUrl] = useState(null);
    const [selectedSong, setSelectedSong] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const doFetch = async () => {
        setIsLoading(true);
        let query = new URLSearchParams({
            page: page,
            page_size: 15,
            ordering: `-created_at`,
            ...filters,
        }).toString();

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/?${query}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.results) {
                setSongs((prevSongs) => [...prevSongs, ...data.results]);
                setNextUrl(data.next);
            }
        } catch (error) {
            console.error("Error fetching songs:", error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchArtistName = async (artistId) => {
        if (artistId) {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}harmonyhub/artists/${artistId}/`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const artistData = await response.json();
                return artistData.name;
            } catch (error) {
                console.error("Error fetching artist:", error);
            }
        }
    };

    const handleLoadMore = () => {
        if (nextUrl) {
            setPage((prevPage) => prevPage + 1);
        }
    };
    
    const handleSongClick = async (song) => {
        const artistId = song.artists[0]; // Asumiendo que el primer ID en el array es el ID del artista principal
        const artistName = await fetchArtistName(artistId);
        song.artistName = artistName; // Añadir el nombre del artista a la canción
        setSelectedSong(song);
        setIsModalOpen(true);
        console.log(`id ${song.id} owner: ${song.owner}`);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    
    const handleOpenEditModal = (song) => {
        setSelectedSong(song);
        setIsEditModalOpen(true);
    };
    
    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedSong(null);
    };
    
    const handleAddSongClick = () => {
        setSelectedSong(null); // Limpiar la canción seleccionada al agregar una nueva
        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleSaveSong = (newForm) => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/`, {
            method: 'POST',
            headers: {
                Authorization: `Token ${token}`,
            },
            body: newForm,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al guardar la canción');
            }
            return response.json();
        })
        .then(data => {
            setSongs([data, ...songs]);
            handleCloseAddModal();
        })
        .catch(error => {
            console.error('Error saving song:', error);
        });
    };
    
    const handleUpdateSong = (updatedForm) => {
        if (!updatedForm.has('id')) {
            updatedForm.append('id', selectedSong.id);
        }
    
        const songId = updatedForm.get('id');
    
        fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/${songId}/`, {
            method: 'PATCH',
            headers: {
                Authorization: `Token ${token}`,
            },
            body: updatedForm,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al actualizar la canción');
            }
            return response.json();
        })
        .then(data => {
            // Actualiza la lista de canciones con la canción actualizada
            const updatedSongs = songs.map(song => song.id === data.id ? data : song);
            setSongs(updatedSongs);
            handleCloseEditModal();
        })
        .catch(error => {
            console.error('Error updating song:', error);
        });
    };

    useEffect(() => {
        doFetch();
    }, [page, filters]);

    return (
        <div style={{ margin: '20px' }}>
            <Grid container spacing={2}>
                {songs.map((song) => (
                    <Grid item xs={2.4} sm={2.4} md={2.4} lg={2.4} key={song.id}>
                        <SongCard song={song} onClick={() => handleSongClick(song)} />
                    </Grid>
                ))}
            </Grid>
            {nextUrl && (
                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <Button
                        onClick={handleLoadMore}
                        variant="contained"
                        color="primary"
                    >
                        {isLoading ? "Cargando..." : "Cargar más"}
                    </Button>
                </div>
            )}
            <Button
                onClick={handleAddSongClick}
                variant="contained"
                color="primary"
                sx={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    borderRadius: '50%',
                    minWidth: '60px',
                    minHeight: '60px',
                    fontSize: '24px',
                    backgroundColor: '#1FDF64',
                    '&:hover': {
                        backgroundColor: '#189945',
                    },
                }}
            >
                +
            </Button>
            {selectedSong && (
                <>
                    <SongModal
                        open={isModalOpen}
                        handleClose={handleCloseModal}
                        song={selectedSong}
                        handleOpenEdit={handleOpenEditModal}
                    />
                    <EditSongModal
                        open={isEditModalOpen}
                        handleClose={handleCloseEditModal}
                        song={selectedSong}
                        token={token}
                        onSave={handleUpdateSong}
                    />
                </>
            )}
            <AddSongModal
                open={isAddModalOpen}
                handleClose={handleCloseAddModal}
                onSave={handleSaveSong}
            />
        </div>
    );
}

export default SongList;


