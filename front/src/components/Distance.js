import React from 'react';

function Distance({ label, name, value, handleChange }) {
  
  return (
    <div>
      <label>
        {label}:
        <input 
          type="number" 
          name={name} 
          value={value}
          min={0}
          onChange={handleChange} 
        />
      </label>
    </div>
  );
}

export default Distance;
