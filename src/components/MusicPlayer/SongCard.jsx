import React from "react";

function SongCard({ song, onClick }) {
    return (
        <div className="card song-card" onClick={() => onClick(song)}>
            <div className="card-image">
                <figure className="image is-128x128"> {/* Tamaño fijo */}
                    <img src={song.image_url || 'default-image.jpg'} alt={song.title} />
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-5">{song.title}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SongCard;
