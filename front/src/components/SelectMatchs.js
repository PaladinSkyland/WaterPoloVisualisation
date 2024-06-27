import React, { useState, useEffect } from 'react';
import '../css/Settings.css';

function SelectMatchs({ value, handleChange }) {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        async function fetchData() {
            // Make an API call to fetch the options
            const response = await fetch('http://localhost:8080/matchs');
            const data = await response.json();
            setOptions(data);
        }
        fetchData();
    }, []);

    return (
        <select name="match" value={value} onChange={handleChange}>
            {options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
            ))}
        </select>
    );
}

export default SelectMatchs;
