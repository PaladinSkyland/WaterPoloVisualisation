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
            value={values.margeH} 
            handleChange={handleChange} 
        />
        <Distance
            label="AncreV" 
            name="ancreV" 
            value={values.ancreV} 
            handleChange={handleChange} 
        />
        <Distance
            label="AncreH" 
            name="ancreH" 
            value={values.ancreH} 
            handleChange={handleChange} 
        />
        <Gender value={values.gender} handleChange={handleChange} />
    </div>
  );
}

export default Settings;
