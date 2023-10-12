// src/components/CreatorList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreatorList() {
    const [creators, setCreators] = useState([]);

    useEffect(() => {
        axios.get('http://your-django-backend-url/api/creators/')
            .then(response => {
                setCreators(response.data);
            })
            .catch(error => {
                console.error("Error fetching creators:", error);
            });
    }, []);

    return (
        <div>
            <h2>Creators:</h2>
            <ul>
                {creators.map(creator => (
                    <li key={creator.id}>{creator.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default CreatorList;
