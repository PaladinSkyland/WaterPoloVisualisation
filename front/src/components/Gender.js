
function Gender({value, handleChange}){
    return(
        <div>
            <input
                type="radio"
                name="gender"
                value="masculin"
                id="masculin"
                onChange={handleChange}
                checked={value === "masculin"}
            />
        <label htmlFor="masculin">Masculin</label>
        <input
                type="radio"
                name="gender"
                value="feminin"
                id="feminin"
                onChange={handleChange}
                checked={value === "feminin"}
            />
        <label htmlFor="feminin">Feminin</label>

        </div>
        
    )
}

export default Gender