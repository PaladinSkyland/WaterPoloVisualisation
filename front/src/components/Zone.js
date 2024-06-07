
function Zone({value, handleChange}){
    return(
        <div>
            <p>Zone</p>
            <input
                type="radio"
                name="zone"
                value="pool"
                id="pool"
                onChange={handleChange}
                checked={value === "pool"}
            />
            <label htmlFor="pool">Piscine</label>
            <br />
            <input
                type="radio"
                name="zone"
                value="waterpolo"
                id="waterpolo"
                onChange={handleChange}
                checked={value === "waterpolo"}
            />
            <label htmlFor="waterpolo">Terrain</label>
            <br />
            <input
                type="radio"
                name="zone"
                value="left"
                id="left"
                onChange={handleChange}
                checked={value === "left"}
            />
            <label htmlFor="left">Gauche</label>
            <br />
            <input
                type="radio"
                name="zone"
                value="right"
                id="right"
                onChange={handleChange}
                checked={value === "right"}
            />
            <label htmlFor="right">Droite</label>
        </div>
        
    )
}

export default Zone