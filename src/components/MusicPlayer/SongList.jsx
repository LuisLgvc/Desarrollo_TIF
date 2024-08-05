import React, { useEffect, useState, useRef } from "react";
import SongCard from "./SongCard";

function SongList() {
    const [page, setPage] = useState(1);
    const [songs, setSongs] = useState([]);
    const [nextUrl, setNextUrl] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState({});
    const [selectedSong, setSelectedSong] = useState(null);

    const observerRef = useRef();
    const lastSongElementRef = useRef();

    const doFetch = async () => {
        setIsLoading(true);
        let query = new URLSearchParams({
            page: page,
            page_size: 5,
            ordering: `-created_at`,
            ...filters,
        }).toString();

        fetch(
            `${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/?${query}`,
            {}
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.results) {
                    setSongs((prevSongs) => [...prevSongs, ...data.results]);
                    setNextUrl(data.next);
                }
            })
            .catch(() => {
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        doFetch();
    }, [page, filters]);

    useEffect(() => {
        if (isLoading) return;

        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver((cards) => {
            if (cards[0].isIntersecting && nextUrl) {
                setPage((prevPage) => prevPage + 1);
            }
        });

        if (lastSongElementRef.current) {
            observerRef.current.observe(lastSongElementRef.current);
        }
    }, [isLoading, nextUrl]);

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
    };

    const handleCloseModal = () => {
        setSelectedSong(null);
    };

    if (isError) return <p>Error al cargar las canciones.</p>;
    if (!songs.length && !isLoading) return <p>No hay canciones disponibles</p>;

    return (
        <div>
            <div className="my-5">
                <h2 className="title">Lista de Canciones</h2>
                <div className="columns is-multiline">
                    {songs.map((song, index) => (
                        <div
                            key={song.id}
                            ref={songs.length === index + 1 ? lastSongElementRef : null}
                            className="column is-one-quarter"
                        >
                            <SongCard song={song} onClick={handleSongClick} />
                        </div>
                    ))}
                </div>
                {isLoading && <p>Cargando más canciones...</p>}
            </div>

            {selectedSong && (
                <div className="modal is-active">
                    <div className="modal-background" onClick={handleCloseModal}></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">{selectedSong.title}</p>
                            <button className="delete" aria-label="close" onClick={handleCloseModal}></button>
                        </header>
                        <section className="modal-card-body">
                            <p><strong>Fecha de Creación:</strong> {new Date(selectedSong.created_at).toLocaleDateString()}</p>
                            <p><strong>Duración:</strong> {selectedSong.duration ? `${Math.floor(selectedSong.duration / 60)}:${selectedSong.duration % 60}` : 'Desconocida'}</p>
                            <p><strong>Contador de Vistas:</strong> {selectedSong.view_count}</p>
                            <audio controls>
                                <source src={selectedSong.song_file} type="audio/mpeg" />
                                Tu navegador no soporta el elemento de audio.
                            </audio>
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-primary" onClick={handleCloseModal}>Cerrar</button>
                        </footer>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SongList;
