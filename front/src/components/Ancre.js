import React from 'react';
import { Layer, Line } from 'react-konva';

const Ancre = ({settings}) => {
  return (
    <Layer>
        <Line
          x={settings.ancreH}
          y={settings.ancreV}
          points={[0.75, 0, 0, 1.5, 1.5, 1.5]}
          offsetY={1.5}
          closed
          fill="orange"
        />
    </Layer>
  );
};

export default Ancre;