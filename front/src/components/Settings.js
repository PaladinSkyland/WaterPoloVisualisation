import React from 'react';
import Distance from './Distance';
import Gender from './Gender';
import SwimmingPool from './SwimmingPool';
import PlayerTable from './PlayerTable';

function Settings({ pool, settings, setSettings }) {

    const maxHorizontalLimit = settings.gender === "male" ? 18 : 23
    const minHorizontalLimit = 1.75
    const maxVerticalLimit = 4
    const minVerticalLimit = 0

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
        })
    }

    const handleValueChange = e => {
        setSettings({
            ...settings,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div>
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
            
            <SwimmingPool className="settings" pool={pool} settings={settings} isSettings={true} />
            <PlayerTable value={pool.players} />

        </div>
    );
}

export default Settings;
