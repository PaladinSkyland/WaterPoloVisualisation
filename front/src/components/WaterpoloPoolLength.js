import {Group, Layer, Rect } from 'react-konva';

function WaterpoloPoolLength(props){
    
    const rightZoneX = props.gender === 'male' ? {orange: 25, red: 28} : {orange: 20, red: 23}
    

    return(
        <Layer>
            
            <Group
                x={3.75} //Put margin x + 1.75 (white band length)
                y={props.yPos + 2} // Put margin y
            >
                            <Rect
                                x={0}
                                y={0}
                                width={2}
                                height={0.5}
                                fill='red'
                                strokeWidth={0.1}
                            />
                            <Rect
                                x={2}
                                y={0}
                                width={3}
                                height={0.5}
                                fill='orange'
                                strokeWidth={0.1}
                            />
                            <Rect
                                x={5}
                                y={0}
                                width={props.gender === 'male' ? 20 : 15}
                                height={0.5}
                                fill='green'
                                strokeWidth={0.1}
                            />
                            <Rect
                                x={rightZoneX.orange}
                                y={0}
                                width={3}
                                height={0.5}
                                fill='orange'
                                strokeWidth={0.1}
                            />
                            <Rect
                                x={rightZoneX.red}
                                y={0}
                                width={2}
                                height={0.5}
                                fill='red'
                                strokeWidth={0.1}
                            />
            </Group>
            </Layer>
                        
    )
    
}

export default WaterpoloPoolLength