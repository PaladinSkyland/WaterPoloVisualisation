
function Settings(props){
   

    const onOptionChange = e => {
        props.setGender(e.target.value)
    }

    return(
        <div>
            <input
                type="radio"
                name="gender"
                value="male"
                id="male"
                onChange={onOptionChange}
                checked={props.gender === "male"}
            />
        <label htmlFor="masculin">Masculin</label>
        <input
                type="radio"
                name="gender"
                value="female"
                id="female"
                onChange={onOptionChange}
                checked={props.gender === "female"}
            />
        <label htmlFor="feminin">Feminin</label>

        </div>
        
    )
}

export default Settings