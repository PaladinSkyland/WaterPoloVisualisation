import '../css/SwimmingPool.css'
import { Stage, Layer, Rect, Circle } from 'react-konva';
import React, { useEffect, useState, useRef } from 'react';
import WaterpoloPoolLength from './WaterpoloPoolLength';
import WaterpoloPoolWidth from './WaterpoloPoolWidth';

function SwimmingPool(props){
    const stageRef = useRef(null);
    const containerRef = useRef(null);

    const [dimensions, setDimensions] = useState({
        width: props.pool.getPoolWidth(),
        height: props.pool.getPoolHeight(),
        scale: 1,
    });
    
    const fitStageIntoParentContainer = () => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const scale = containerWidth / (props.pool.getPoolWidth());
            setDimensions({
                width: props.pool.getPoolWidth() * scale,
                height: props.pool.getPoolHeight() * scale,
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
                                width={props.pool.getPoolWidth()}
                                height={props.pool.getPoolHeight()}
                                fill="#6472ef"
                                stroke="black"
                                strokeWidth={0.2}
                            />
                        </Layer>
                        <WaterpoloPoolLength gender={props.gender} yPos={0}></WaterpoloPoolLength>
                        <WaterpoloPoolLength gender={props.gender} yPos={20.5}></WaterpoloPoolLength> 
                        <WaterpoloPoolWidth gender={props.gender} xPos={5}> </WaterpoloPoolWidth>

                        <Layer className="players">
                            {props.pool.players.map((player, index) => (
                                <Circle
                                    key={index}
                                    x={player.x}
                                    y={player.y}
                                    radius={0.5}
                                    fill="red"
                                />
                            ))}
                        </Layer>
                    </Stage>
                </div>
            </div>
        </div>
    )
}

export default SwimmingPool