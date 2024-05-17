import '../css/SwimmingPool.css'
import { Stage, Layer, Rect } from 'react-konva';
import React, { useEffect, useState, useRef } from 'react';
import Player from './Player';

function SwimmingPool(props){
    const stageRef = useRef(null);
    const containerRef = useRef(null);

    const getPoolHeight = () => {
        return 25;
    }

    const getPoolWidth = () => {
        return 50;
    }

    const getWaterpoloPoolHeight = () => {
        return 20;
    }

    const getWaterpoloPoolWidth = () => {
        return props.gender === "male" ? 30 : 25;
    }

    const [dimensions, setDimensions] = useState({
        width: getPoolWidth(),
        height: getPoolHeight(),
        scale: 1,
    });
    
    const fitStageIntoParentContainer = () => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const scale = containerWidth / (getPoolWidth());
            setDimensions({
                width: getPoolWidth() * scale,
                height: getPoolHeight() * scale,
                scale,
            });
        }
    };
    
    useEffect(() => {
        fitStageIntoParentContainer();
        window.addEventListener('resize', fitStageIntoParentContainer);
    
        return () => {window.removeEventListener('resize', fitStageIntoParentContainer)};
    }, []);
    
    return(
        <div>
            <div className="pool-container">
                <div className="title">
                    Visualisation des trajectoires de poloïstes
                </div>
                <div ref={containerRef} className="stage-container">
                    <Stage
                        width={dimensions.width}
                        height={dimensions.height}
                        scaleX={dimensions.scale}
                        scaleY={dimensions.scale}
                        ref={stageRef}
                    >
                        <Layer className="swimming-pool">
                            <Rect
                                x={0}
                                y={0}
                                width={getPoolWidth()}
                                height={getPoolHeight()}
                                fill="#6472ef"
                                stroke="black"
                                strokeWidth={0.2}
                            />
                        </Layer>
                        <Layer className="waterpolo-pool">
                            <Rect
                                x={2}
                                y={2}
                                width={getWaterpoloPoolWidth()}
                                height={getWaterpoloPoolHeight()}
                                stroke="black"
                                strokeWidth={0.1}
                            />
                        </Layer>
                        <Layer className="players">
                            {props.pool.players.map((player, index) => (
                                <Player player={player} index={index} key={index}/>
                            ))}
                        </Layer>
                    </Stage>
                </div>
            </div>
        </div>
    )
}

export default SwimmingPool