import React from 'react';
import SongList from './MusicPlayer/SongList';
import { useAuth } from '../contexts/AuthContext';

function Home() {
    const { token, user__id } = useAuth("state");
    return (
        <div>
            <h1>Bienvenido a la página principal</h1>
            <p>
                token: {token}
            </p>
            <p>
                user__id: {user__id}
            </p>
        </div>
    );
}

export default Home;