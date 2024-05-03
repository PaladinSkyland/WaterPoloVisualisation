import './css/App.css';
import './components/SwimmingPool';
import SwimmingPool from './components/SwimmingPool';
import Pool from './class/Pool';
import React, { useEffect, useState } from 'react';

function App() {
  const [pool, setPool] = useState(new Pool());

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080?file=dynamic4'); // Adresse du serveur WebSocket

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.x && data.y) {
        const { anchor, x, y, z, precision } = data;
        pool.movePlayerOrAdd(anchor, x, y, z, precision);
      }
      setPool({ ...pool });
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="App">
      <div id="pool-container">
        <SwimmingPool pool={pool} />
      </div>
    </div>
  );
}

export default App;
