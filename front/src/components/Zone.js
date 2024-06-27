import React, { useState } from 'react';

function Zone({ value, settings, setSettings }) {
    const [clickedImage, setClickedImage] = useState(null);

    const handleChange = e => {
        setSettings({
            ...settings,
            [e.target.name]: e.target.value
        });
    }

    const handleImageClick = value => {
        setClickedImage(value);
    }

    return (
        <div>
            <input
                type="radio"
                name="zone"
                value="pool"
                id="pool"
                onChange={handleChange}
                checked={value === "pool"}
                style={{ display: "none" }}
            />
            <label htmlFor="pool">
                <img
                    src={process.env.PUBLIC_URL + '/assets/fullscreen-exit.svg'}
                    alt="Quitter plein écran"
                    className={clickedImage === 'pool' ? 'clicked' : ''}
                    onClick={() => handleImageClick('pool')}
                />
            </label>
            <br />
            <input
                type="radio"
                name="zone"
                value="waterpolo"
                id="waterpolo"
                onChange={handleChange}
                checked={value === "waterpolo"}
                style={{ display: "none" }}
            />
            <label htmlFor="waterpolo">
                <img
                    src={process.env.PUBLIC_URL + '/assets/fullscreen.svg'}
                    alt="Plein écran"
                    className={clickedImage === 'waterpolo' ? 'clicked' : ''}
                    onClick={() => handleImageClick('waterpolo')}
                />
            </label>
            <br />
            <input
                type="radio"
                name="zone"
                value="left"
                id="left"
                onChange={handleChange}
                checked={value === "left"}
                style={{ display: "none" }}
            />
            <label htmlFor="left">
                <img
                    src={process.env.PUBLIC_URL + '/assets/letter-g.svg'}
                    alt="Vue but gauche"
                    className={clickedImage === 'left' ? 'clicked' : ''}
                    onClick={() => handleImageClick('left')}
                />
            </label>
            <br />
            <input
                type="radio"
                name="zone"
                value="right"
                id="right"
                onChange={handleChange}
                checked={value === "right"}
                style={{ display: "none" }}
            />
            <label htmlFor="right">
                <img
                    src={process.env.PUBLIC_URL + '/assets/letter-d.svg'}
                    alt="Vue but droit"
                    className={clickedImage === 'right' ? 'clicked' : ''}
                    onClick={() => handleImageClick('right')}
                />
            </label>
        </div>
    )
}

export default Zone;
