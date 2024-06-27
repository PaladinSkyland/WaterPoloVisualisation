import '../css/Settings.css'
import React from 'react';

function Distance({ label, name, value, handleChange }) {

  const handleIncrement = () => {
    handleChange({ target: { name, value: value + 0.5 } });
  };

  const handleDecrement = () => {
    handleChange({ target: { name, value: value - 0.5 } });
  };

  return (
    <div className='distance-button'>
      <div>{label}</div>
      <div className='distance-controller'>
        <input
          type="number"
          name={name}
          value={value}
          min={0}
          onChange={handleChange}
        />
        <div className='icon-container'>
          <img 
            className='svg-icon' 
            src={process.env.PUBLIC_URL + '/assets/plus.svg'} 
            alt="Plus" 
            onClick={handleIncrement} 
          />
          <img 
            className='svg-icon' 
            src={process.env.PUBLIC_URL + '/assets/minus.svg'} 
            alt="Minus" 
            onClick={handleDecrement} 
          />
        </div>
      </div>
    </div>
  );
}

export default Distance;
