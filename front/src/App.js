import './css/App.css';
import './components/SwimmingPool';
import SwimmingPool from './components/SwimmingPool';
import SettingsContainer from './components/SettingsContainer';
import Pool from './class/Pool';
import React, { useEffect, useState } from 'react';

function App() {
  const [pool, setPool] = useState(new Pool());

  const [showInputs, setShowInputs] = useState(false);
  const [settings, setSettings] = useState(() => {
    const storedValues = localStorage.getItem('values');
    return storedValues ? JSON.parse(storedValues) : {
      margeV: 0,
      margeH: 0,
      ancreV: 0,
      ancreH: 0,
      gender: 'male',
      zone: 'pool',
    };
  });

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080?file=dynamic5'); // Adresse du serveur WebSocket
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.x && data.y) {
        const { time, anchor, x, y, z, precision } = data;
        setPool((currentPool) => {
          const newPool = Object.create(
            Object.getPrototypeOf(currentPool),
            Object.getOwnPropertyDescriptors(currentPool)
          );
          newPool.movePlayerOrAdd(time, anchor, x, y, z, precision);
          return newPool;
        });
      }
    };
  
    return () => {
      ws.close();
    };

  }, []);

  return (
    <div className="App">
      <SwimmingPool pool={pool} settings={settings}/>
      <SettingsContainer settings={settings} setSettings={setSettings} showInputs={showInputs} setShowInputs={setShowInputs} />
    </div>
  );
}

export default App;
