
function Gender({value, handleChange}){
    return(
        <div>
            <input
                type="radio"
                name="gender"
                value="male"
                id="male"
                onChange={handleChange}
                checked={value === "male"}
            />
        <label htmlFor="male">Masculin</label>
        <input
                type="radio"
                name="gender"
                value="female"
                id="female"
                onChange={handleChange}
                checked={value === "female"}
            />
        <label htmlFor="female">Feminin</label>

        </div>
        
    )
}

export default Gender