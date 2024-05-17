import React from 'react';
import Distance from './Distance';
import Gender from './Gender';

function Settings({ values, setValues }) {

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

  return (
    <div>
        <Distance 
            label="MargeV" 
            name="margeV" 
            value={values.margeV} 
            handleChange={handleChange} 
        />
        <Distance 
            label="MargeH" 
            name="margeH" 
            value={values.ancre} 
            handleChange={handleChange} 
        />
        <Distance
            label="Ancre" 
            name="ancre" 
            value={values.ancre} 
            handleChange={handleChange} 
        />
        <Gender value={values.gender} handleChange={handleChange} />
    </div>
  );
}

export default Settings;
