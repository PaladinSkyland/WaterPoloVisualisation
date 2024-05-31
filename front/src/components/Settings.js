import React from 'react';
import Distance from './Distance';
import Gender from './Gender';

function Settings({ values, setValues }) {

    const maxLimit = 20;

    const handleNumberChange = (event) => {
        const { name, value } = event.target;
        let newValue = parseFloat(value);

        if (newValue > maxLimit) {
            newValue = maxLimit;
        }

        setValues({
            ...values,
            [name]: isNaN(newValue) ? 0 : newValue
        })
    }

    const handleGenderChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }
    
  return (
    <div>
        <Distance 
            label="MargeV" 
            name="margeV" 
            value={values.margeV} 
            handleChange={handleNumberChange} 
        />
        <Distance 
            label="MargeH" 
            name="margeH" 
            value={values.margeH} 
            handleChange={handleNumberChange} 
        />
        <Distance
            label="AncreV" 
            name="ancreV" 
            value={values.ancreV} 
            handleChange={handleNumberChange} 
        />
        <Distance
            label="AncreH" 
            name="ancreH" 
            value={values.ancreH} 
            handleChange={handleNumberChange} 
        />
        <Gender value={values.gender} handleChange={handleGenderChange} />
    </div>
  );
}

export default Settings;
