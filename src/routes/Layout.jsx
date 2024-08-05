/* import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { ThemeProvider } from "@teishi/bulma_theme";
import Navbar from "../components/Navbar";

export default function Layout() {
    return (
        <AuthProvider>
            <div
                className={`hero is-fullheight is-flex is-flex-direction-column`}
            >
                {<ThemeProvider>}
                    <Navbar />
                    <Outlet />
                {</ThemeProvider>}
            </div>
        </AuthProvider>
    );
}
 */

import { Outlet, useLocation } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";

export default function Layout() {
    const location = useLocation();
    const hideNavbar = location.pathname === '/login';

    return (
        <AuthProvider>
            <div>
                {!hideNavbar && <Navbar />}
                <Outlet />
            </div>
        </AuthProvider>
    );
}
