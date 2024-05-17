import React from 'react';
import Settings from './Settings';
import '../css/SettingsContainer.css';

function SettingsContainer({ values, setValues, showInputs, setShowInputs }) {

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
                    <Settings values={values} setValues={setValues} />
                </div>
            )}
        </div>
    );
}

export default SettingsContainer;