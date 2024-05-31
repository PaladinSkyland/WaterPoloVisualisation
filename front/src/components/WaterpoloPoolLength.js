import {Group, Layer, Rect } from 'react-konva';

function WaterpoloPoolLength(props){
    
    const rightZoneX = props.settings.gender === 'male' ? {orange: 25, red: 28} : {orange: 20, red: 23}
    const yPos = props.up ? 0 : 20.5

    return(
        <Layer>
            
            <Group
                x={0}
                y={0} 
            >               
                            <Rect
                                x={0}
                                y={yPos + props.settings.margeV}
                                width={props.settings.margeH}
                                height={0.5}
                                fill='white'
                                strokeWidth={0.1}
                            />
                            <Rect
                                x={props.settings.margeH}
                                y={yPos + props.settings.margeV}
                                width={2}
                                height={0.5}
                                fill='red'
                                strokeWidth={0.1}
                            />
                            <Rect
                                x={props.settings.margeH + 2}
                                y={yPos + props.settings.margeV}
                                width={3}
                                height={0.5}
                                fill='orange'
                                strokeWidth={0.1}
                            />
                            <Rect
                                x={props.settings.margeH + 5}
                                y={yPos + props.settings.margeV}
                                width={props.settings.gender === 'male' ? 20 : 15}
                                height={0.5}
                                fill='green'
                                strokeWidth={0.1}
                            />
                            <Rect
                                x={props.settings.margeH + rightZoneX.orange}
                                y={yPos + props.settings.margeV}
                                width={3}
                                height={0.5}
                                fill='orange'
                                strokeWidth={0.1}
                            />
                            <Rect
                                x={props.settings.margeH + rightZoneX.red}
                                y={yPos + props.settings.margeV}
                                width={2}
                                height={0.5}
                                fill='red'
                                strokeWidth={0.1}
                            />
                            <Rect
                                x={props.settings.gender === 'male' ? 30 + props.settings.margeH : 25 + props.settings.margeH}
                                y={yPos + props.settings.margeV}
                                width={props.settings.gender === 'male' ? 20 - props.settings.margeH  : 25 - props.settings.margeH}
                                height={0.5}
                                fill='white'
                                strokeWidth={0.1}
                            />
            </Group>
            </Layer>
                        
    )
    
}

export default WaterpoloPoolLength