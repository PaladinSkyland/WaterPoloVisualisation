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

    const handleValidation = () => {
        const hasDuplicateNumber = players.some((player, index) => 
            player.number !== "" && players.findIndex(p => p.number === player.number) !== index
        );
    
        const hasDuplicateName = players.some((player, index) => 
            player.name !== "" && players.findIndex(p => p.name === player.name) !== index
        );
    
        if (hasDuplicateNumber || hasDuplicateName) {
            console.log("There are duplicate numbers or names.");
            // Handle the case where duplicates are found
            // For example, you could show an error message to the user
        } else {
            console.log("No duplicates found.");
            // Proceed with the validation as all players have unique numbers and names
        }
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
            <button onClick={handleValidation}>Valider</button>
        </div>
    );
};

export default PlayerTable;
