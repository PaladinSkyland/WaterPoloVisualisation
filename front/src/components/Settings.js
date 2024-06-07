import React from 'react';
import Distance from './Distance';
import Gender from './Gender';
import Zone from './Zone';

function Settings({ settings, setSettings }) {

    const maxLimit = 20;

    const handleNumberChange = (event) => {
        const { name, value } = event.target;
        let newValue = parseFloat(value);

        if (newValue > maxLimit) {
            newValue = maxLimit;
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
