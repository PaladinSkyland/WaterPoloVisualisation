import React, { useState } from 'react';
import '../css/PlayerTable.css';

const PlayerTable = ({pool, setPool}) => {
    const [duplicateNumbers, setDuplicateNumbers] = useState([]);
    const [duplicateNames, setDuplicateNames] = useState([]);
    const [hasDuplicates, setHasDuplicates] = useState(false);

    const setPlayers = (value) => {
        setPool((currentPool) => {
            const newPool = Object.create(
              Object.getPrototypeOf(currentPool),
              Object.getOwnPropertyDescriptors(currentPool)
            );
            newPool.setPlayers(value);
            return newPool;
          });
        
    }

    const renderTableRows = () => {
        return pool.players.map((player, index) => (
            <tr key={index}>
                <td>{`P${index + 1}`}</td>
                <td>
                    <input
                        type="number"
                        value={player.number || ''}
                        className={duplicateNumbers.includes(index) ? 'duplicate' : ''}
                        onChange={(e) => handleNumberChange(e, index)}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        value={player.name}
                        className={duplicateNames.includes(index) ? 'duplicate' : ''}
                        onChange={(e) => handleNameChange(e, index)}
                    />
                </td>
            </tr>
        ));
    };

    const handleNumberChange = (e, index) => {
        const updatedPlayers = [...pool.players];
        updatedPlayers[index].number = e.target.value;
        setPlayers(updatedPlayers);
    };

    const handleNameChange = (e, index) => {
        const updatedPlayers = [...pool.players];
        updatedPlayers[index].name = e.target.value;
        setPlayers(updatedPlayers);
    };

    const handleValidation = () => {
        const numberMap = {};
        const nameMap = {};
        
        pool.players.forEach((player, index) => {
            if (player.number) {
                if (!numberMap[player.number]) {
                    numberMap[player.number] = [];
                }
                numberMap[player.number].push(index);
            }
            if (player.name) {
                if (!nameMap[player.name]) {
                    nameMap[player.name] = [];
                }
                nameMap[player.name].push(index);
            }
        });

        const duplicateNumbersIndices = Object.values(numberMap)
            .filter(indices => indices.length > 1)
            .flat();

        const duplicateNamesIndices = Object.values(nameMap)
            .filter(indices => indices.length > 1)
            .flat();

        setDuplicateNumbers(duplicateNumbersIndices);
        setDuplicateNames(duplicateNamesIndices);

        if (duplicateNumbersIndices.length || duplicateNamesIndices.length) {
            setHasDuplicates(true);
            console.log("There are duplicate numbers or names.");
        } else {
            setHasDuplicates(false);
            console.log("No duplicates found.");
            const updatedPlayers = [...pool.players];
            pool.players.forEach((player, index) => {
                updatedPlayers[index].setNumber(player.number);
                updatedPlayers[index].setName(player.name);
                setPlayers(updatedPlayers);
            });
            console.log(pool.players);
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
            <div className="validation-container">
                <button className="validation-button" onClick={handleValidation}>Valider</button>
                {hasDuplicates && <span className="error-message">Il y a des entrées en double.</span>}
            </div>
        </div>
    );
    
};

export default PlayerTable;
