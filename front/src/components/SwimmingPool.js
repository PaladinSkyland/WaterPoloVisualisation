import '../css/SwimmingPool.css'

function SwimmingPool(props){

    

    return(
        <div>
            <div className="pool-container">
                <div className="title">
                    Visualisation des trajectoires de poloïstes
                </div>
                <div className="swimming-pool">
                    <div className={'waterpolo-pool ' + props.gender}/>
                </div>
            </div>
        </div>
    )
}

export default SwimmingPool