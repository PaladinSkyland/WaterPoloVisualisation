import React from 'react';
import Settings from './Settings';
import '../css/SettingsContainer.css';

function SettingsContainer({ settings, setSettings, showInputs, setShowInputs }) {

    const toggleInputs = () => {
        setShowInputs(!showInputs);
      };

    return (
        <div>
            <button onClick={toggleInputs}>
                {showInputs ? 'Masquer les zones de saisie' : 'Afficher les zones de saisie'}
            </button>
      
            {showInputs && (
                <div className={`settings ${showInputs ? 'show' : ''}`}>
                    <Settings settings={settings} setSettings={setSettings} />
                </div>
            )}
        </div>
    );
}

export default SettingsContainer;