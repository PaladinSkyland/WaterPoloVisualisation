import React from 'react';

function Distance({ label, name, value, handleChange }) {
  return (
    <div>
      <label>
        {label}:
        <input 
          type="text" 
          name={name} 
          value={value} 
          onChange={handleChange} 
        />
      </label>
    </div>
  );
}

export default Distance;
