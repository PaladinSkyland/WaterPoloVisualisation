import React from 'react';
import Distance from './Distance';
import Gender from './Gender';
import SwimmingPool from './SwimmingPool';
import PlayerTable from './PlayerTable';
import SelectMatchs from './SelectMatchs';

function Settings({ pool, setPool, settings, setSettings}) {

    const maxHorizontalLimit = settings.gender === "male" ? 18 : 23;
    const minHorizontalLimit = 1.75;
    const maxVerticalLimit = 4;
    const minVerticalLimit = 0;

    const handleNumberChange = (event) => {
        const { name, value } = event.target;
        let newValue = parseFloat(value);

        if (name === "margeH" && newValue > maxHorizontalLimit) {
            newValue = maxHorizontalLimit;
        }
        else if (name === "margeH" && newValue < minHorizontalLimit) {
            newValue = minHorizontalLimit;
        }
        else if (name === "margeV" && newValue > maxVerticalLimit) {
            newValue = maxVerticalLimit;
        }
        else if (name === "margeV" && newValue < minVerticalLimit) {
            newValue = minVerticalLimit;
        }

        setSettings({
            ...settings,
            [name]: isNaN(newValue) ? 0 : newValue
        });
    };

    const handleValueChange = e => {
        console.log(e.target.value);
        console.log(e.target.name);
        setSettings({
            ...settings,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="settings-container">
            <div className='section terrain-management'>
                <h2>Gestion du terrain</h2>
                <div className='distance-container'>
                    <div className='margin-container'>
                        <Distance
                            label="Marge verticale"
                            name="margeV"
                            value={settings.margeV}
                            step="0.1"
                            handleChange={handleNumberChange}
                        />
                        <Distance
                            label="Marge horizontale"
                            name="margeH"
                            value={settings.margeH}
                            step="0.1"
                            handleChange={handleNumberChange}
                        />
                    </div>
                    <div className='margin-container'>
                        <Distance
                            label="Ancre verticale"
                            name="ancreV"
                            value={settings.ancreV}
                            step="0.1"
                            handleChange={handleNumberChange}
                        />
                        <Distance
                            label="Ancre horizontale"
                            name="ancreH"
                            value={settings.ancreH}
                            step="0.1"
                            handleChange={handleNumberChange}
                        />
                    </div>
                </div>
                <div className='gender-container'>
                    <Gender value={settings.gender} handleChange={handleValueChange} />
                </div>
            </div>
    
            <div className='section match-selection'>
                <h2>Sélection des matchs</h2>
                <SelectMatchs value={settings.match} handleChange={handleValueChange} />
            </div>
    
            <div className='section terrain-preview'>
                <h2>Prévisualisation du terrain</h2>
                <SwimmingPool className="settings" pool={pool} settings={settings} isSettings={true} />
            </div>
    
            <div className='section player-table'>
                <h2>Tableau des joueurs</h2>
                <PlayerTable pool={pool} setPool={setPool} />
            </div>
        </div>
    );
    
}

export default Settings;
