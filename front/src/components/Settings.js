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
        label="Marge" 
        name="marge" 
        value={values.marge} 
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
