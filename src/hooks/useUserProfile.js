import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const useUserProfile = () => {
    const { state } = useAuth("state");
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (state.token) {
            fetch(`${import.meta.env.VITE_API_BASE_URL}users/profiles/profile_data/`, {
                method: "GET",
                headers: {
                    Authorization: `Token ${state.token}`,
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Error al obtener los datos del usuario");
                    }
                    return response.json();
                })
                .then(data => {
                    setUserData(data);
                    setIsLoading(false);
                })
                .catch(err => {
                    setError(err);
                    setIsLoading(false);
                });
        }
    }, [state.token]);

    return { userData, isLoading, error };
};

export default useUserProfile;
