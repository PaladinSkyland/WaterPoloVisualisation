import React, { useEffect, useRef, useState } from 'react';
import { Group, Circle, Text, Arrow, Arc, Line } from 'react-konva';
import { Animation } from 'konva';

function Player(props) {
    const { innerRef, player, index, fontSize } = props;
    player.speed = player.y;
    let [time, setTime] = useState(0);

    const playerRef = innerRef;
    const spinnerRef = useRef(null);

    useEffect(() => {
        if (playerRef.current === null) return;
        if (player.time === time) return;
        if (time === 0) setTime(player.time);
        playerRef.current.to({
            x: player.x,
            y: player.y,
            duration: player.time - time,
        });
        setTime(player.time);
    }, [player.time, player.x, player.y, time]);

    useEffect(() => {
        if (spinnerRef.current === null) return;
        const animation = new Animation((frame) => {
            if (spinnerRef.current === null) return;
            const angleDiff = (frame.timeDiff * 360) / 2000;
            const newRotation = (spinnerRef.current.rotation() + angleDiff) % 360;
            spinnerRef.current.rotation(newRotation);
        }, spinnerRef.current.getLayer());
    
        animation.start();
    
        return () => {
          animation.stop();
        };
      }, [spinnerRef.current]);
    
    const getColorForValue = (value, minValue, maxValue) => {
        const normalizedValue = Math.min(Math.max(value / maxValue, minValue), 1);
      
        const colors = [
            { color: 'black', position: 0, r: 0, g: 0, b: 0},
            { color: 'red', position: 0.25, r: 255, g: 0, b: 0},
            { color: 'orange', position: 0.5, r: 255, g: 165, b: 0},
            { color: 'yellow', position: 0.75, r: 255, g: 255, b: 0},
            { color: 'green', position: 1, r: 0, g: 255, b: 0},
        ];
      
        let startIndex = 0;
        let endIndex = colors.length - 1;
        for (let i = 0; i < colors.length - 1; i++) {
            if (normalizedValue >= colors[i].position && normalizedValue < colors[i + 1].position) {
                startIndex = i;
                endIndex = i + 1;
                break;
            }
        }
      
        const startColor = colors[startIndex];
        const endColor = colors[endIndex];
        const gradient = (normalizedValue - startColor.position) / (endColor.position - startColor.position);
        const interpolatedColor = {
          r: Math.floor(startColor.r + gradient * (endColor.r - startColor.r)),
          g: Math.floor(startColor.g + gradient * (endColor.g - startColor.g)),
          b: Math.floor(startColor.b + gradient * (endColor.b - startColor.b))
        };
      
        const toHex = (value) => value.toString(16).padStart(2, '0');
        return `#${toHex(interpolatedColor.r)}${toHex(interpolatedColor.g)}${toHex(interpolatedColor.b)}`;
    };
    
    return (
        <Group
            ref={playerRef}
            x={0}
            y={0}
            offsetX={fontSize * 2}
            offsetY={fontSize * 2}
            key={index}
            width={fontSize * 4}
            height={fontSize * 4}
            className="player"
            value={index}
            align="center"
            onMouseEnter={(e) => {
                document.body.style.cursor = 'pointer';
            }}
            onMouseLeave={(e) => {
                document.body.style.cursor = 'default';
            }}
        >
            {player.selected &&
                <Arc
                    ref={spinnerRef}
                    x={fontSize * 2}
                    y={fontSize * 2}
                    innerRadius={fontSize * 1.5}
                    outerRadius={fontSize * 2}
                    angle={270}
                    fill="#FF0000"
                    rotation={0}
                />
            }
            <Circle
                x={fontSize * 2}
                y={fontSize * 2}
                radius={fontSize}
                fill="red"
                className="player"
                value={index}
                />
            <Text
                x={fontSize * 2}
                y={fontSize * 2}
                text={'P' + (index + 1)}
                fontSize={fontSize}
                fill="white"
                align="center"
                verticalAlign='middle'
                height={fontSize * 4}
                width={fontSize * 4}
                wrap='none'
                rotation={-playerRef.current?.getStage()?.rotation()}
                offsetX={fontSize * 2}
                offsetY={fontSize * 2}
                className="player"
                value={index}
            />
            <Circle
                x={fontSize * 2}
                y={fontSize * 2}
                radius={fontSize}
                stroke={getColorForValue(player.speed, 0, 20)}
                strokeWidth={0.2 * fontSize}
                className="player"
                value={index}
            />
            {player.speed > 5 && 
                <Arrow
                    x={fontSize * 2}
                    y={fontSize * 2}
                    points={[0, 0, fontSize * 2, 0]}
                    pointerLength={fontSize}
                    pointerWidth={fontSize}
                    fill={getColorForValue(player.speed, 0, 20)}
                    rotation={player.speed * 100}
                    className="player"
                    value={index}
                />
            }
        </Group>
    )

};

export default Player;