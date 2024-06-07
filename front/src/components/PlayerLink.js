import React, { useRef } from 'react';
import { Group, Line, Text, Label } from 'react-konva';

function PlayerLink(props) {
    const { player1, player2, fontSize } = props;
    const x1 = player1.current?.x() ?? player1.x ?? 0;
    const y1 = player1.current?.y() ?? player1.y ?? 0;
    const x2 = player2.current?.x() ?? player2.x ?? 0;
    const y2 = player2.current?.y() ?? player2.y ?? 0;
    const d = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

    const lineRef = useRef();
    const textRef = useRef();

    return (
        <Group>
            <Group
                clipFunc={(ctx) => {
                    if (textRef.current && lineRef.current) {
                        let stageTransform = lineRef.current.getStage().getAbsoluteTransform().copy().invert();
                        let lineBox = lineRef.current.getClientRect();
                        lineBox = {p1: {x: lineBox.x, y: lineBox.y}, p2: {x: lineBox.x + lineBox.width, y: lineBox.y + lineBox.height}};
                        lineBox = {p1: stageTransform.point(lineBox.p1), p2: stageTransform.point(lineBox.p2)};
                        lineBox = {
                            x: Math.min(lineBox.p1.x, lineBox.p2.x),
                            y: Math.min(lineBox.p1.y, lineBox.p2.y),
                            width: Math.abs(lineBox.p2.x - lineBox.p1.x),
                            height: Math.abs(lineBox.p2.y - lineBox.p1.y),
                        };
                        ctx.rect(lineBox.x, lineBox.y, lineBox.width, lineBox.height);

                        let textBox = textRef.current.getClientRect();
                        textBox = {p1: {x: textBox.x, y: textBox.y}, p2: {x: textBox.x + textBox.width, y: textBox.y + textBox.height}};
                        textBox = {p1: stageTransform.point(textBox.p1), p2: stageTransform.point(textBox.p2)};
                        textBox = {
                            x: Math.min(textBox.p1.x, textBox.p2.x),
                            y: Math.min(textBox.p1.y, textBox.p2.y),
                            width: Math.abs(textBox.p2.x - textBox.p1.x),
                            height: Math.abs(textBox.p2.y - textBox.p1.y),
                        };
                        ctx.rect(textBox.x, textBox.y, textBox.width, textBox.height);

                        ctx.clip('evenodd');
                    };
                }}
            >
                <Line
                    ref={lineRef}
                    points={[x1, y1, x2, y2]}
                    stroke="#000000"
                    strokeWidth={0.5 * fontSize}
                    lineCap="round"
                    lineJoin="round"
                />
            </Group>
            <Label
                ref={textRef}
                x={(x1 + x2) / 2}
                y={(y1 + y2) / 2}
                offsetX={1.8 * fontSize}
                offsetY={0.8 * fontSize}
                rotation={-textRef.current?.getStage()?.rotation() || 0}
                >
                <Text
                    text={d.toFixed(2) + 'm'}
                    fontSize={fontSize}
                    fill="#FFFFFF"
                    align="center"
                    verticalAlign='middle'
                    wrap='none'
                    padding={0.2 * fontSize}
                />
            </Label>
        </Group>
    )

};

export default PlayerLink;