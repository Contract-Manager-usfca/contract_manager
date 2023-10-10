import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataFetcher() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Define the API endpoint
        const apiURL = 'https://api.example.com/data';

        // Use Axios to fetch data from the API
        axios.get(apiURL)
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);  // The empty array means this useEffect runs once when the component mounts.

    // Render the component
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Data from API:</h2>
            <ul>
                {data.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default DataFetcher;
