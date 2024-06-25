import React, { useState, useEffect } from 'react';
import '../css/Statistics.css';

const Statistics = (props) => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        const response = await fetch(`http://localhost:8080/stats/${props.settings.match}`);
        const data = await response.json();
        setPlayers(data);
    };

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    const formatDistance = (distance) => {
        if (distance < 1000) {
            return `${distance.toFixed(2)} m`;
        } else {
            return `${(distance / 1000).toFixed(2)} km`;
        }
    }

    return (
        <div class="stats-container">
            <h1 class="stats-header">Statistiques des joueurs</h1>
            <table class="stats-table">
                <thead class="table-header">
                    <tr class="header-row">
                        <th>Joueur</th>
                        <th>Tag</th>
                        <th>Distance totale</th>
                        <th>Temps de jeu</th>
                        <th>Vitess moyenne</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player, index) => (
                        <tr class="data-row" key={index}>
                            <td>{`P${index + 1}`}</td>
                            <td>
                                {player.anchor}
                            </td>
                            <td>
                                {formatDistance(player.total_distance)}
                            </td>
                            <td>
                                {formatTime(player.total_time)}
                            </td>
                            <td>
                                {player.average_speed.toFixed(2)} m/s
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Statistics;
