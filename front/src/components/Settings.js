import React from 'react';
import Distance from './Distance';
import Gender from './Gender';
import Zone from './Zone';

function Settings({ settings, setSettings }) {

    const maxHorizontalLimit = settings.gender === "male" ? 18 : 23
    const minHorizontalLimit = 2
    const maxVerticalLimit = 4

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
        <Distance 
            label="MargeV" 
            name="margeV" 
            value={settings.margeV} 
            handleChange={handleNumberChange} 
        />
        <Distance 
            label="MargeH" 
            name="margeH" 
            value={settings.margeH} 
            handleChange={handleNumberChange} 
        />
        <Distance
            label="AncreV" 
            name="ancreV" 
            value={settings.ancreV} 
            handleChange={handleNumberChange} 
        />
        <Distance
            label="AncreH" 
            name="ancreH" 
            value={settings.ancreH} 
            handleChange={handleNumberChange} 
        />
        <Gender value={settings.gender} handleChange={handleValueChange} />
        <Zone value={settings.zone} handleChange={handleValueChange} />
    </div>
  );
}

export default Settings;
