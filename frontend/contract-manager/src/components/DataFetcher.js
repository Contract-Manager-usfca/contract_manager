import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataFetcher() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Define the API endpoint
        const apiURL = 'http://your-django-backend-url/api/get_items/';

        // Use Axios to fetch data from the API
        axios.get(apiURL)
            .then(response => {
                setItems(response.data);
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
            <h2>Item List:</h2>
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default DataFetcher;
