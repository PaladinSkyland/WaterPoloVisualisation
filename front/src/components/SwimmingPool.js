import '../css/SwimmingPool.css'
import { Stage, Layer, Rect } from 'react-konva';
import React, { useEffect, useState, useRef, createRef } from 'react';
import WaterpoloPoolLength from './WaterpoloPoolLength';
import WaterpoloPoolWidth from './WaterpoloPoolWidth';
import Player from './Player';
import PlayerLink from './PlayerLink';

function SwimmingPool(props){
    const stageRef = useRef(null);
    const containerRef = useRef(null);

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [dimensions, setDimensions] = useState({
        width: props.pool.getPoolWidth(),
        height: props.pool.getPoolHeight(),
        scale: 1,
        offsetX: 0,
        offsetY: 0,
        rotation: 0,
        fontSize: 0.5
    });
    
    const arrLength = props.pool.players.length;
    const playersRef = useRef([]);

    if (playersRef.current.length !== arrLength) {
      playersRef.current = Array(arrLength).fill().map((_, i) => playersRef.current[i] || createRef());
    }
    
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
                        rotation: 0,
                        fontSize: 0.5
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
                        rotation: 90,
                        fontSize: 0.3
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
                        rotation: 90,
                        fontSize: 0.3
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
                        rotation: 0,
                        fontSize: 0.5
                    });
                }
            }
        };

        fitStageIntoParentContainer();
        window.addEventListener('resize', fitStageIntoParentContainer);
    
        return () => {window.removeEventListener('resize', fitStageIntoParentContainer)};
    }, [props.pool, props.settings]);
    
    const handleClick = (e) => {
        if (e.target.attrs.className?.includes("player")) {
            const selectedPlayer = props.pool.players.findIndex(player => player.selected);
            if (selectedPlayer !== -1) {
                props.pool.players[selectedPlayer].selected = false;
                if (e.target.attrs.value === selectedPlayer) return;
                addLink(selectedPlayer, e.target.attrs.value);
            }
            props.pool.players[e.target.attrs.value].selected = !props.pool.players[e.target.attrs.value].selected;
        }
    }

    const addLink = (player1, player2) => {
        if (props.pool.playersLinks.some(link => (link.player1 === player1 && link.player2 === player2) || (link.player1 === player2 && link.player2 === player1))) {
            props.pool.playersLinks = props.pool.playersLinks.filter(link => (link.player1 !== player1 || link.player2 !== player2) && (link.player1 !== player2 || link.player2 !== player1));
        }
        else {
            props.pool.playersLinks.push({ player1: player1, player2: player2 });
        }
    }


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
                        onClick={handleClick}
                        onTap={handleClick}
                        onMouseMove={e => {
                            const pos = stageRef.current.getPointerPosition();
                            const transform = stageRef.current.getAbsoluteTransform().copy().invert();
                            setMousePos(transform.point(pos));                      
                          }}
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
                        <Layer className="waterpolo-pool">
                            <WaterpoloPoolLength settings={props.settings} up={true}></WaterpoloPoolLength>
                            <WaterpoloPoolLength settings={props.settings} ></WaterpoloPoolLength>
                            <WaterpoloPoolWidth settings={props.settings} left={true}></WaterpoloPoolWidth>
                            <WaterpoloPoolWidth settings={props.settings} ></WaterpoloPoolWidth>
                        </Layer>

                        <Layer className="players">
                            {props.pool.players.some(player => player.selected) && (
                                <PlayerLink player1={playersRef.current[props.pool.players.findIndex(player => player.selected)]} player2={mousePos} fontSize={dimensions.fontSize} />
                            )}
                            {props.pool.playersLinks.map((link) => (
                                    <PlayerLink player1={playersRef.current[link.player1]} player2={playersRef.current[link.player2]} key={link.player1 + '-' + link.player2} fontSize={dimensions.fontSize} />
                                )
                            )}
                            {props.pool.players.map((player, index) => (
                                    <Player innerRef={playersRef.current[index]} player={player} index={index} key={index} fontSize={dimensions.fontSize} />
                                )
                            )}
                        </Layer>
                    </Stage>
                </div>
            </div>
        </div>
    )
}

export default SwimmingPool