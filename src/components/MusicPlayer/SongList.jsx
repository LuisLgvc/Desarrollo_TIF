import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import useFetchSongs from '../../hooks/UseFetchSongs';
import SongCard from './SongCard';
import SongModal from './SongModal';
import EditSongModal from './EditSongModal';
import AddSongModal from './AddSongModal';
import DeleteSongModal from './DeleteSongModal';
import { useAuth } from '../../contexts/AuthContext';

function SongList() {
    const { token, user__id, isAuthenticated } = useAuth("state");
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({});
    const [selectedSong, setSelectedSong] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);

    const { songs, isLoading, isError, nextUrl, setSongs } = useFetchSongs(page, filters);

    const handleLoadMore = () => {
        if (nextUrl) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const handleSongClick = async (song) => {
        try {
            setSelectedSong(song);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error fetching artist name:', error);
        }
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
        setSelectedSong(null);
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
            const updatedSongs = songs.map(song => song.id === data.id ? data : song);
            setSongs(updatedSongs);
            handleCloseEditModal();
        })
        .catch(error => {
            console.error('Error updating song:', error);
        });
    };

    const handleDeleteSong = async () => {
        if (!selectedSong) return;

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/harmonyhub/songs/${selectedSong.id}/`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );

            if (response.ok) {
                setSongs(songs.filter(song => song.id !== selectedSong.id));
                setIsConfirmDeleteModalOpen(false);
                setIsModalOpen(false);
            } else {
                console.error("Error al eliminar la canción");
            }
        } catch (error) {
            console.error("Error al eliminar la canción", error);
        }
    };

    const handleOpenConfirmDeleteModal = () => {
        setIsConfirmDeleteModalOpen(true);
    };

    const handleCloseConfirmDeleteModal = () => {
        setIsConfirmDeleteModalOpen(false);
    };

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
                        sx={{ backgroundColor: '#1FDF64', '&:hover': { backgroundColor: '#189945' }, fontSize: '20px' }}
                    >
                        {isLoading ? "Cargando..." : "Mas Canciones"}
                    </Button>
                </div>
            )}
            {isAuthenticated && (
                <Button
                    onClick={handleAddSongClick}
                    variant="contained"
                    sx={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        borderRadius: '30%',
                        minWidth: '70px',
                        minHeight: '70px',
                        fontSize: '35px',
                        backgroundColor: '#1FDF64',
                        '&:hover': {
                            backgroundColor: '#189945',
                        },
                    }}
                >
                    +
                </Button>
            )}
            {selectedSong && (
                <>
                    <SongModal
                        open={isModalOpen}
                        handleClose={handleCloseModal}
                        song={selectedSong}
                        handleOpenEdit={handleOpenEditModal}
                        handleDelete={handleOpenConfirmDeleteModal}
                        user__id={user__id}
                    />
                    <EditSongModal
                        open={isEditModalOpen}
                        handleClose={handleCloseEditModal}
                        song={selectedSong}
                        token={token}
                        onSave={handleUpdateSong}
                    />
                    <DeleteSongModal
                        open={isConfirmDeleteModalOpen}
                        handleClose={handleCloseConfirmDeleteModal}
                        handleConfirm={handleDeleteSong}
                    />
                </>
            )}
            <AddSongModal
                open={isAddModalOpen}
                handleClose={handleCloseAddModal}
                onSave={handleSaveSong}
                isAuthenticated={isAuthenticated}
            />
        </div>
    );
}

export default SongList;
