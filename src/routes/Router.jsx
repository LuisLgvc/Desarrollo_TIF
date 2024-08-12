import { createBrowserRouter} from "react-router-dom";
import MySongs from "../components/MusicPlayer/MySongs";
import Albums from "../components/Albums/Albums";
import Login from "../components/Authentication/Login";
import ArtistList from "../components/Artists/ArtistList";
import Profile from "../components/Profile";
import Layout from "./Layout";
import SongList from "../components/MusicPlayer/SongList";
import NotFound from "../components/NotFound";
import ProtectedRoute from "./ProtectedRoute";

const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                index: true,
                element: <SongList />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "mysongs",
                element: <MySongs />,
            },
            {
                path: "albums",
                element: <Albums />,
            },
            {
                path: "artists",
                element: <ArtistList />,
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>),
            }
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export { Router };