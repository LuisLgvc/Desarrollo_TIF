import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import SongCard from './SongCard';
import SongModal from './SongModal';

function SongList() {
    const [songs, setSongs] = useState([]);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [nextUrl, setNextUrl] = useState(null);
    const [selectedSong, setSelectedSong] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const doFetch = async () => {
        setIsLoading(true);
        let query = new URLSearchParams({
            page: page,
            page_size: 15,
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

    function handleSearch(event) {
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
    }

    const handleSongClick = (song) => {
        setSelectedSong(song);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSong(null);
    };

    function loadMoreSongs() {
        setPage((prevPage) => prevPage + 1);
    }

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
                <div style={{ textAlign: "center", margin: "20px" }}>
                    <Button
                        onClick={loadMoreSongs}
                        disabled={isLoading}
                        variant="contained"
                        color="success"
                        size="large"
                    >
                        {isLoading ? "Cargando..." : "Cargar más"}
                    </Button>
                </div>
            )}
            {isError && <div>Error al cargar las canciones.</div>}
            <SongModal open={isModalOpen} handleClose={handleCloseModal} song={selectedSong} />
        </div>
    );
}

export default SongList;