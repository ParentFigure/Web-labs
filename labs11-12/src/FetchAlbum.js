import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchAlbums = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await axios.get("http://localhost:3000/albums");
                setAlbums(response.data);
            } catch (error) {
                setError(error.response ? error.response.data.message : error.message);
            } finally {
                setTimeout(() => setLoading(false), 1000);
            }
        };
        fetchAlbums();
    }, []);

    return { albums, loading, error };
};

export default useFetchAlbums;
