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
        offsetX: 0,
        offsetY: 0,
        rotation: 0
    });
    
    
    useEffect(() => {
        const fitStageIntoParentContainer = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const containerHeight = containerRef.current.offsetHeight;
                if (props.settings.zone === 'waterpolo') {
                    const scaleX = containerWidth / (props.pool.getWaterpoloPoolWidth(props.settings.gender) + 3.5);
                    const scaleY = containerHeight / (props.pool.getWaterpoloPoolHeight() + 1);
                    const scale = Math.min(scaleX, scaleY);
                    setDimensions({
                        width: (props.pool.getWaterpoloPoolWidth(props.settings.gender) + 3.5) * scale,
                        height: (props.pool.getWaterpoloPoolHeight() + 1) * scale,
                        scale: scale,
                        offsetX: (1.75 - props.settings.margeH) * scale,
                        offsetY: -props.settings.margeV * scale,
                        rotation: 0
                    });
                }
                else if (props.settings.zone === 'right') {
                    const scaleX = containerWidth / (props.pool.getWaterpoloPoolHeight() + 1);
                    const scaleY = containerHeight / (props.pool.getWaterpoloPoolWidth(props.settings.gender) * 0.35);
                    const scale = Math.min(scaleX, scaleY);
                    const heightPercent = containerHeight / (scale * props.pool.getWaterpoloPoolWidth(props.settings.gender));
                    setDimensions({
                        width: (props.pool.getWaterpoloPoolHeight() + 1) * scale,
                        height: props.pool.getWaterpoloPoolWidth(props.settings.gender) * heightPercent * scale,
                        scale: scale,
                        offsetX: (1 + props.settings.margeV + props.pool.getWaterpoloPoolHeight()) * scale,
                        offsetY: -(1.75 + props.settings.margeH + props.pool.getWaterpoloPoolWidth(props.settings.gender) * (1 - heightPercent)) * scale,
                        rotation: 90
                    });
                }
                else if (props.settings.zone === 'left') {
                    const scaleX = containerWidth / (props.pool.getWaterpoloPoolHeight() + 1);
                    const scaleY = containerHeight / (props.pool.getWaterpoloPoolWidth(props.settings.gender) * 0.35);
                    const scale = Math.min(scaleX, scaleY);
                    const heightPercent = containerHeight / (scale * props.pool.getWaterpoloPoolWidth(props.settings.gender));
                    setDimensions({
                        width: (props.pool.getWaterpoloPoolHeight() + 1) * scale,
                        height: props.pool.getWaterpoloPoolWidth(props.settings.gender) * heightPercent * scale,
                        scale: scale,
                        offsetX: (1 + props.settings.margeV + props.pool.getWaterpoloPoolHeight()) * scale,
                        offsetY: (1.75 - props.settings.margeH) * scale,
                        rotation: 90
                    });
                }
                else {
                    const scaleX = containerWidth / (props.pool.getPoolWidth());
                    const scaleY = containerHeight / (props.pool.getPoolHeight());
                    const scale = Math.min(scaleX, scaleY);
                    setDimensions({
                        width: props.pool.getPoolWidth() * scale,
                        height: props.pool.getPoolHeight() * scale,
                        scale: scale,
                        offsetX: 0,
                        offsetY: 0,
                        rotation: 0
                    });
                }
            }
        };

        fitStageIntoParentContainer();
        window.addEventListener('resize', fitStageIntoParentContainer);
    
        return () => {window.removeEventListener('resize', fitStageIntoParentContainer)};
    }, [props.pool, props.settings]);
    
    return(
        <div>
            <div className="pool-container">
                <div ref={containerRef} className="stage-container">
                    <Stage
                        x={dimensions.offsetX}
                        y={dimensions.offsetY}
                        width={dimensions.width}
                        height={dimensions.height}
                        scaleX={dimensions.scale}
                        scaleY={dimensions.scale}
                        rotation={dimensions.rotation}
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
                                <Player player={player} index={index} key={index} rotation={dimensions.rotation}/>
                            ))}
                        </Layer>
                    </Stage>
                </div>
            </div>
        </div>
    )
}

export default SwimmingPool