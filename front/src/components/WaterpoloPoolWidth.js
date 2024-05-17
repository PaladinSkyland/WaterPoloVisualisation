import {Group, Layer, Rect } from 'react-konva';

function WaterpoloPoolWidth(props){
    return(
        <Layer>
            <Group
            x={0} //Put margin x
            y={0} // Put margin y
        >
            <Rect
                                x={0 + 2} // put x margin instead of 2
                                y={0}
                                width={0.5}
                                height={25}
                                fill='white'

                            />
                            <Rect
                                x={1.25 + 2} // put x margin instead of 2
                                y={0}
                                width={0.5}
                                height={25}
                                fill='white'

                            />
                            <Rect
                                x={0}
                                y={0 + 2} // put y margin instead of + 2 
                                width={1.75 + 2} // put x margin instead of 2
                                height={0.5}
                                fill='white'

                            />
                            <Rect
                                x={0}
                                y={20.5 + 2} // put y margin instead of + 2 
                                width={1.75 + 2} // put x margin instead of 2 
                                height={0.5}
                                fill='white'

                            />
                            <Rect
                                x={0 + 2} // margin x instead of 2
                                y={2 +0.5} // put y margin instead of 2 
                                width={0.5} // put x margin instead of 2 
                                height={2.5}
                                fill='red'

                            />
                            <Rect
                                x={1.25 + 2} // margin x instead of 2
                                y={2 +0.5} // put y margin instead of 2 
                                width={0.5} // put x margin instead of 2 
                                height={2.5}
                                fill='red'

                            />
                            <Rect
                                x={2} // margin x instead of 2
                                y={2 + 2.5} // put y margin instead of 2 
                                width={1.75} // put x margin instead of 2 
                                height={0.5}
                                fill='red'

                            />

            </Group>
        </Layer>

        
    )
}


export default WaterpoloPoolWidth

