import './css/App.css';
import './components/SwimmingPool';
import SwimmingPool from './components/SwimmingPool';
import Settings from './components/Settings';
import Pool from './class/Pool';
import React, { useEffect, useState } from 'react';

function App() {
  const [pool, setPool] = useState(new Pool());
  const [gender, setGender] = useState("male");

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080?file=dynamic5'); // Adresse du serveur WebSocket

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
      <SwimmingPool gender={gender} pool={pool}/>
      <Settings gender={gender} setGender={setGender}/>
      
    </div>
  );
}

export default App;
