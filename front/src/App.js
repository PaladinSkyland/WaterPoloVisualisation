import './css/App.css';
import './components/SwimmingPool';
import SwimmingPool from './components/SwimmingPool';
import SettingsContainer from './components/SettingsContainer';
import Pool from './class/Pool';
import React, { useEffect, useState } from 'react';

function App() {
  const [pool, setPool] = useState(new Pool());

  const [showInputs, setShowInputs] = useState(false);
  const [values, setValues] = useState({
    margeV: '',
    margeH: '',
    ancreV: '',
    ancreH: '',
    gender: 'masculin'
  });

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
      <SwimmingPool gender={values.gender} pool={pool}/>
      <SettingsContainer values={values} setValues={setValues} showInputs={showInputs} setShowInputs={setShowInputs} />
    </div>
  );
}

export default App;
