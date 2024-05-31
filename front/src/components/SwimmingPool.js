import '../css/SwimmingPool.css'
import { Stage, Layer, Rect } from 'react-konva';
import React, { useEffect, useState, useRef } from 'react';
import WaterpoloPoolLength from './WaterpoloPoolLength';
import WaterpoloPoolWidth from './WaterpoloPoolWidth';
import Player from './Player';

function SwimmingPool(props){
    const stageRef = useRef(null);
    const containerRef = useRef(null);

    const [dimensions, setDimensions] = useState({
        width: props.pool.getPoolWidth(),
        height: props.pool.getPoolHeight(),
        scale: 1,
    });
    
    
    useEffect(() => {
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

        fitStageIntoParentContainer();
        window.addEventListener('resize', fitStageIntoParentContainer);
    
        return () => {window.removeEventListener('resize', fitStageIntoParentContainer)};
    }, [props.pool]);
    
    return(
        <div>
            <div className="pool-container">
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
                        <WaterpoloPoolLength settings={props.settings} up={true}></WaterpoloPoolLength>
                        <WaterpoloPoolLength settings={props.settings} ></WaterpoloPoolLength>
                        <WaterpoloPoolWidth settings={props.settings} left={true}></WaterpoloPoolWidth>
                        <WaterpoloPoolWidth settings={props.settings} ></WaterpoloPoolWidth>

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