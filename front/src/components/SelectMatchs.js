import React, { useState, useEffect } from 'react';
import '../css/Settings.css';

function SelectMatchs({ value, handleChange }) {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        // Make an API call to fetch the options
        fetch('http://localhost:2000/matchs')
            .then(response => response.json())
            .then(data => setOptions(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <select value={value} onChange={handleChange}>
            {options.map(option => (
                <option key={option.id} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default SelectMatchs;
