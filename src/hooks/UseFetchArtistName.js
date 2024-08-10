// src/hooks/UseFetchArtistName.js
const fetchArtistName = async (artistId) => {
    if (!artistId) return null; // Return null if no valid artistId is provided

    try {
        const response = await fetch(`https://sandbox.academiadevelopers.com/artists/${artistId}/`);
        if (!response.ok) {
            if (response.status === 404) {
                console.warn(`Artist with ID ${artistId} not found.`);
                return "Unknown Artist"; // Or handle as needed
            }
            throw new Error('Error fetching artist name');
        }

        const data = await response.json();
        return data.name || "Unknown Artist"; // Adjust based on actual response structure
    } catch (error) {
        console.error("Error fetching artist name:", error);
        return "Unknown Artist"; // Or handle as needed
    }
};

export default fetchArtistName;
