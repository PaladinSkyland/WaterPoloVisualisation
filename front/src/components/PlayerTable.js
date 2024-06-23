import React, { useState, useEffect } from 'react';

const PlayerTable = ({ value }) => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const initialPlayers = value.map(player => {
            player.number = player.number || '';
            player.name = player.name || '';
            return player;
        });
        setPlayers(initialPlayers);
    }, [value]);

    const renderTableRows = () => {
        return players.map((player, index) => (
            <tr key={index}>
                <td>{`P${index + 1}`}</td>
                <td>
                    <input
                        type="number"
                        value={player.number}
                        onChange={(e) => handleNumberChange(e, index)}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        value={player.name}
                        onChange={(e) => handleNameChange(e, index)}
                    />
                </td>
            </tr>
        ));
    };

    const handleNumberChange = (e, index) => {
        const updatedPlayers = [...players];
        updatedPlayers[index].number = e.target.value;
        setPlayers(updatedPlayers);
    };

    const handleNameChange = (e, index) => {
        const updatedPlayers = [...players];
        updatedPlayers[index].name = e.target.value;
        setPlayers(updatedPlayers);
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Joueur</th>
                        <th>Numéro</th>
                        <th>Nom</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableRows()}
                </tbody>
            </table>
        </div>
    );
};

export default PlayerTable;
