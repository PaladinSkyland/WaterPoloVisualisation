import React from 'react';
import Distance from './Distance';
import Gender from './Gender';

function Settings({ settings, setSettings }) {

    const handleChange = e => {
        const value = parseInt(e.target.value)
        setSettings({
            ...settings,
            [e.target.name]: isNaN(value) ? 0 : value
        })
    }
    
  return (
    <div>
        <Distance 
            label="MargeV" 
            name="margeV" 
            value={settings.margeV} 
            handleChange={handleChange} 
        />
        <Distance 
            label="MargeH" 
            name="margeH" 
            value={settings.margeH} 
            handleChange={handleChange} 
        />
        <Distance
            label="AncreV" 
            name="ancreV" 
            value={settings.ancreV} 
            handleChange={handleChange} 
        />
        <Distance
            label="AncreH" 
            name="ancreH" 
            value={settings.ancreH} 
            handleChange={handleChange} 
        />
        <Gender value={settings.gender} handleChange={handleChange} />
    </div>
  );
}

export default Settings;
