import {Group, Layer, Rect } from 'react-konva';

function WaterpoloPoolWidth(props){

    return(
        <Layer>
            <Group
            x={0} 
            y={0} 
        >
            <Rect
                                x={props.left ? props.settings.margeH - 0.5 : props.settings.gender === "male" ? 30 + props.settings.margeH : 25 + props.settings.margeH} 
                                y={0}
                                width={0.5}
                                height={25}
                                fill='white'

                            />
                            <Rect
                                x={props.left ? props.settings.margeH - 1.75 : props.settings.gender === "male" ? 31.25 + props.settings.margeH : 26.25 + props.settings.margeH} 
                                y={0}
                                width={0.5}
                                height={25}
                                fill='white'

                            />

                            {/* Prison */}
                            <Rect
                                x={props.left ? props.settings.margeH - 0.5 : props.settings.gender === "male" ? 30 + props.settings.margeH : 25 + props.settings.margeH} // margin x instead of 2
                                y={props.settings.margeV + 0.5}  
                                width={0.5} 
                                height={2.5}
                                fill='red'

                            />
                            <Rect
                                x={props.left ? props.settings.margeH - 1.75 : props.settings.gender === "male" ? 31.25 + props.settings.margeH : 26.25 + props.settings.margeH} // margin x instead of 2
                                y={props.settings.margeV + 0.5}  
                                width={0.5} 
                                height={2.5}
                                fill='red'

                            />
                            <Rect
                                x={props.left ? props.settings.margeH - 1.75 : props.settings.gender === "male" ? 30 + props.settings.margeH : 25 + props.settings.margeH} // margin x instead of 2
                                y={props.settings.margeV + 2.5}  
                                width={1.75} 
                                height={0.5}
                                fill='red'

                            />

                            {/* Goal */}
                            <Rect
                                x={props.left ? props.settings.margeH - 1.75 : props.settings.gender === "male" ? 29.7 + props.settings.margeH : 24.7 + props.settings.margeH } // margin x instead of 2
                                y={props.settings.margeV + 9}  
                                width={2.05} 
                                height={3}
                                fill='black'

                            />

            </Group>
        </Layer>

        
    )
}


export default WaterpoloPoolWidth

