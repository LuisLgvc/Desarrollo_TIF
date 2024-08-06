import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import SongCard from './SongCard';
import SongModal from './SongModal';
import SongEditModal from './ModalAddSong';

function SongList() {
    const [songs, setSongs] = useState([]);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [nextUrl, setNextUrl] = useState(null);
    const [selectedSong, setSelectedSong] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

    useEffect(() => {
        doFetch();
    }, [page, filters]);

    const handleSearch = (event) => {
        event.preventDefault();
        const searchForm = new FormData(event.target);
        const newFilters = {};
        searchForm.forEach((value, key) => {
            if (value) {
                newFilters[key] = value;
            }
        });
        setFilters(newFilters);
        setSongs([]);
        setPage(1);
    };

    const handleSongClick = (song) => {
        setSelectedSong(song);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSong(null);
    };

    const handleEditSong = (song) => {
        setSelectedSong(song);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedSong(null);
    };

    const handleSaveSong = (updatedSong) => {
        // Aquí puedes manejar la lógica para guardar la canción actualizada
        console.log('Canción actualizada:', updatedSong);
    };

    const loadMoreSongs = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <div style={{ margin: '20px' }}>
            <form onSubmit={handleSearch}>
                {/* Implementación del formulario de búsqueda */}
            </form>
            <Grid container spacing={2}>
                {songs.map((song, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={index}>
                        <SongCard song={song} onClick={() => handleSongClick(song)} />
                    </Grid>
                ))}
            </Grid>
            {nextUrl && (
                <div style={{ textAlign: "center", margin: "30px" }}>
                    <Button
                        onClick={loadMoreSongs}
                        disabled={isLoading}
                        variant="contained"
                        color="success"
                        size="large"
                        sx={{ marginRight: '20px' }}
                    >
                        {isLoading ? "Cargando..." : "Cargar más"}
                    </Button>
                    <Button
                        color="success"
                        size="large"
                        onClick={() => handleEditSong({})}
                    >
                        Agregar canción
                    </Button>
                </div>
            )}
            {isError && <div>Error al cargar las canciones.</div>}
            <SongModal open={isModalOpen} handleClose={handleCloseModal} song={selectedSong} />
            <SongEditModal open={isEditModalOpen} handleClose={handleCloseEditModal} song={selectedSong} onSave={handleSaveSong} />
        </div>
    );
}

export default SongList;