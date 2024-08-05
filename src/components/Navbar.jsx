import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
    const { state } = useAuth('state');
    const { isAuthenticated } = state || {}; // Asegurar que state esté definido

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item">
                    <img src="../assets/spotixImg.png" alt="logo" />
                    <span>Spotix</span>
                </Link>
            </div>
            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link to="/songs" className="navbar-item">Songs</Link>
                    <Link to="/genres" className="navbar-item">Genres</Link>
                    <Link to="/artists" className="navbar-item">Artists</Link>
                    <Link to="/albums" className="navbar-item">Albums</Link>
                    <Link to="/playlists" className="navbar-item">Playlists</Link>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        {isAuthenticated ? (
                            <button className="button" onClick={() => useAuth('actions').logout()}>Logout</button>
                        ) : (
                            <Link to="/login" className="button">Iniciar Sesión</Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
