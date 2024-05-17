
function Settings(props){
   

    const onOptionChange = e => {
        props.setGender(e.target.value)
    }

    return(
        <div>
            <input
                type="radio"
                name="gender"
                value="masculin"
                id="masculin"
                onChange={onOptionChange}
                checked={props.gender === "masculin"}
            />
        <label htmlFor="masculin">Masculin</label>
        <input
                type="radio"
                name="gender"
                value="feminin"
                id="feminin"
                onChange={onOptionChange}
                checked={props.gender === "feminin"}
            />
        <label htmlFor="feminin">Feminin</label>

        </div>
        
    )
}

export default Settings