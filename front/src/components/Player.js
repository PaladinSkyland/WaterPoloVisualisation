import React, { useEffect, useRef, useState } from 'react';
import { Group, Circle, Text, Arrow } from 'react-konva';

function Player(props) {
    const { player, index } = props;
    player.speed = player.y;
    const size = 0.5;
    let [time, setTime] = useState(0);

    const playerRef = useRef(null);

    useEffect(() => {
        if (playerRef.current === null) return;
        if (player.time === time) return;
        if (time === 0) setTime(player.time);
        playerRef.current.to({
            x: player.x - size * 2,
            y: player.y - size * 2,
            duration: player.time - time,
        });
        setTime(player.time);
    }, [player.time, player.x, player.y, time]);

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
            key={index}
            width={size * 4}
            height={size * 4}
        >
            <Circle
                x={size * 2}
                y={size * 2}
                radius={size}
                fill="red"
            />
            <Text
                x={size * 2}
                y={size * 2}
                text={'P' + (index + 1)}
                fontSize={size}
                fill="white"
                align="center"
                verticalAlign='middle'
                height={size * 4}
                width={size * 4}
                wrap='none'
                rotation={-props.rotation}
                offsetX={size * 2}
                offsetY={size * 2}
            />
            <Circle
                x={size * 2}
                y={size * 2}
                radius={size}
                stroke={getColorForValue(player.speed, 0, 20)}
                strokeWidth={0.1}
            />
            {player.speed > 5 && 
                <Arrow
                    x={size * 2}
                    y={size * 2}
                    points={[0, 0, size * 2, 0]}
                    pointerLength={size}
                    pointerWidth={size}
                    fill={getColorForValue(player.speed, 0, 20)}
                    rotation={player.speed * 100}
                />
            }
        </Group>
    )

};

export default Player;