import { useEffect } from 'react';
import '../css/SwimmingPool.css'

function SwimmingPool(props){
    return(
        <div>
            <div className="pool-container">
                <div className="title">
                    Visualisation des trajectoires de poloïstes
                </div>
                
          <div className="swimming-pool" >
                    <div className={'waterpolo-pool ' + props.gender} style={{ position: 'relative' }}>
                    {/* Afficher les joueurs */}
                    {props.pool.players.map((player, index) => (
              <div
                key={index}
                className="player"
                style={{
                  left: (player.y / props.pool.width) * 100 + '%',
                  top: (player.x / props.pool.height) * 100 + '%',
                  transform: 'translate(-50%, -50%)', // Pour centrer le joueur
                  position: 'absolute', // Position absolue par rapport à la piscine parente
                }}
              ></div>
            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SwimmingPool