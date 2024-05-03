import './css/App.css';
import './components/SwimmingPool'
import SwimmingPool from './components/SwimmingPool';
import React, { useEffect, useState } from 'react';

function App() {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 , precision: 0});

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080?file=dynamic4'); // Adresse du serveur WebSocket

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.x && data.y) {
        setCoordinates({ x: data.x, y: data.y, precision: data.precision });
      }
    };

    return () => {
      ws.close();
    };
  }, []);
  
  const circleStyle = {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: 'green',
    position: 'absolute',
    top: coordinates.x *25 +400 + 'px',
    left: coordinates.y *25 +400 + 'px',
    transform: 'translate(-50%, -50%)', // Pour centrer le rond
  };

  return (
    <div className="App">
      <div className="App">
      <h1>Coordonnées X et Y</h1>
      <p>X: {coordinates.x}, Y: {coordinates.y} precision: {coordinates.precision}</p>
    </div>
      <SwimmingPool/>
      <div style={circleStyle}></div>

    </div>
  );
}

export default App;
