import React from 'react';
import '../css/Settings.css';

function Gender({ value, handleChange }) {
    return (
        <div className="gender-container">
            <div className='gender'>
                <input
                    type="radio"
                    name="gender"
                    value="male"
                    id="male"
                    onChange={handleChange}
                    checked={value === "male"}
                    style={{ display: "none" }} 
                />
                <label htmlFor="male" className={`gender-label ${value === "male" ? "selected" : ""}`}>
                    <img
                        src={process.env.PUBLIC_URL + '/assets/male.svg'} 
                        alt="Masculin"
                        className='svg-icon'
                    />
                    Masculin
                </label>
            </div>
            <div className='gender'>
                <input
                    type="radio"
                    name="gender"
                    value="female"
                    id="female"
                    onChange={handleChange}
                    checked={value === "female"}
                    style={{ display: "none" }}
                />
                <label htmlFor="female" className={`gender-label ${value === "female" ? "selected" : ""}`}>
                    <img
                        src={process.env.PUBLIC_URL + '/assets/female.svg'}
                        alt="Féminin"
                        className='svg-icon'
                    />
                    Féminin
                </label>
            </div>
        </div>
    );
}

export default Gender;
