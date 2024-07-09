import React, { useState, useEffect } from 'react';
import '../css/Statistics.css';

const Statistics = (props) => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/stats/${props.settings.match}`);
            const data = await response.json();

            // merge players with pool players
            const players = props.pool.players.map(poolPlayer => {
                const player = data.find(player => poolPlayer.tag === player.anchor);
                return {
                    ...player,
                    ...poolPlayer
                };
            });
            console.log(players);
            setPlayers(players);
        };

        fetchData();
    }, [props.settings.match, props.pool.players]);
    

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
        <div className="stats-container">
            <h1 className="stats-header">Statistiques des joueurs</h1>
            <table className="stats-table">
                <thead className="table-header">
                    <tr className="header-row">
                        <th>Joueur</th>
                        <th>Numéro</th>
                        <th>Nom</th>
                        <th>Distance totale</th>
                        <th>Temps de jeu</th>
                        <th>Vitess moyenne</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player, index) => (
                        <tr className="data-row" key={index}>
                            <td>{`P${index + 1}`}</td>
                            <td>
                                {player.number}
                            </td>
                            <td>
                                {player.name}
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
