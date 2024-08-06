/* import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Songs from "../components/Songs";
import Genres from "../components/Genres";
import Albums from "../components/Albums";
import Artists from "../components/Artists";
import Playlists from "../components/Playlists";
import Login from "../components/Authentication/Login";
import Layout from "./Layout";

const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                index: true, // path: "/"
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "songs",
                element: <Songs />,
            },
            {
                path: "genres",
                element: <Genres />,
            },
            {
                path: "albums",
                element: <Albums />,
            },
            {
                path: "playlists",
                element: <Playlists />,
            },
            {
                path: "artists",
                element: <Artists />,
            }
        ],
    },
    {
        path: "*",
        element: <h1>Not Found</h1>,
    },
]);

export { Router };
 */

import { createBrowserRouter } from "react-router-dom";
/* import Home from "../components/Home"; */
import Songs from "../components/Songs";
import Genres from "../components/Genres";
import Albums from "../components/Albums";
import Artists from "../components/Artists";
import Playlists from "../components/Playlists";
import Login from "../components/Authentication/Login";
import Layout from "./Layout";
import SongList from "../components/MusicPlayer/SongList";

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
            /* {
                path: "songs",
                element: <SongList />,
            }, */
            {
                path: "genres",
                element: <Genres />,
            },
            {
                path: "albums",
                element: <Albums />,
            },
            {
                path: "playlists",
                element: <Playlists />,
            },
            {
                path: "artists",
                element: <Artists />,
            }
        ],
    },
    {
        path: "*",
        element: <h1>Not Found</h1>,
    },
]);

export { Router };
