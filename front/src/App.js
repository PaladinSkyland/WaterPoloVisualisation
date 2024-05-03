import './css/App.css';
import './components/SwimmingPool'
import SwimmingPool from './components/SwimmingPool';
import React, { useEffect, useState } from 'react';

function App() {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080'); // Adresse du serveur WebSocket

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
    };

    return () => {
      ws.close();
    };
  }, []);
  return (
    <div className="App">
      <div className="App">
      <h1>Coordonnées X et Y</h1>
      <p>X: {coordinates.x}, Y: {coordinates.y}</p>
    </div>
      <SwimmingPool/>

    </div>
  );
}

export default App;
