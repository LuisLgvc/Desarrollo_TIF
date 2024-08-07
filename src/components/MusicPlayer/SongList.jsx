import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import SongCard from './SongCard';
import SongModal from './SongModal';
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

    const handleSongClick = async (song) => {
        const artistId = song.artists[0]; // Asumiendo que el primer ID en el array es el ID del artista principal
        const artistName = await fetchArtistName(artistId);
        song.artistName = artistName; // Añadir el nombre del artista a la canción
        setSelectedSong(song);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        
        console.log(token);
        
        setIsModalOpen(false);
        setSelectedSong(null);
    };

    const handleAddSongClick = () => {
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
        .then(response => response.json())
        .then(data => {
            setSongs([data, ...songs]);
            handleCloseAddModal();
        })
        .catch(error => {
            console.error('Error saving song:', error);
        });
    };

    useEffect(() => {
        doFetch();
    }, [page, filters]);

    return (
        <div style={{ margin: '20px' }}>
            <Grid container spacing={2}>
                {songs.map((song, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={index}>
                        <SongCard song={song} onClick={() => handleSongClick(song)} />
                    </Grid>
                ))}
            </Grid>
            {nextUrl && (
                <div style={{ textAlign: "center", margin: "20px" }}>
                    <Button
                        onClick={() => setPage(page + 1)}
                        disabled={isLoading}
                        variant="contained"
                        size="large"
                        sx={{ backgroundColor: '#1FDF64', '&:hover': { backgroundColor: '#189945' } }}
                    >
                        {isLoading ? "Cargando..." : "Cargar más"}
                    </Button>
                </div>
            )}
            {isError && <div>Error al cargar las canciones.</div>}
            <SongModal open={isModalOpen} handleClose={handleCloseModal} song={selectedSong} />
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Button
                    onClick={handleAddSongClick}
                    variant="contained"
                    size="large"
                    sx={{ backgroundColor: '#1FDF64', '&:hover': { backgroundColor: '#189945' } }}
                >
                    Agregar Canción
                </Button>
            </div>
            <AddSongModal open={isAddModalOpen} handleClose={handleCloseAddModal} onSave={handleSaveSong} />
        </div>
    );
}

export default SongList;


