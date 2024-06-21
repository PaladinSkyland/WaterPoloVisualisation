import './css/App.css';
import './components/SwimmingPool';
import SwimmingPool from './components/SwimmingPool';
import SettingsContainer from './components/SettingsContainer';
import Pool from './class/Pool';
import React, { useEffect, useState } from 'react';

function App() {
  const address = 'ws://localhost:8080?file=dynamic5';

  const [pool, setPool] = useState(new Pool());

  const [showInputs, setShowInputs] = useState(false);
  const [values, setValues] = useState({
    margeV: '',
    margeH: '',
    ancreV: '',
    ancreH: '',
    gender: 'masculin'
  });
  
  const [progress, setProgress] = useState(0);
  const [[mintime,maxtime], setMinMaxTime] = useState([0,100]);
  //const [data, setData] = useState(null);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const newWs = new WebSocket(address); // Adresse du serveur WebSocket
    setWs(newWs);
    
    newWs.addEventListener('open', () => {
      newWs.send(JSON.stringify({ timestamp: 0}));
    });

    newWs.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.TimeData) {
        setMinMaxTime([data.TimeData.firstTime / 1000, data.TimeData.lastTime / 1000]);
      }
      if (data.x && data.y) {
        const { anchor, x, y, z, precision } = data;
        setPool((currentPool) => {
          const newPool = Object.create(
            Object.getPrototypeOf(currentPool),
            Object.getOwnPropertyDescriptors(currentPool)
          );
          newPool.movePlayerOrAdd(anchor, x, y, z, precision);
          return newPool;
        });
      }
    };
  
    return () => {
      newWs.close();
    };
  }, []);

    useEffect(() => {
    const interval = setInterval(() => {
      if (progress < maxtime) {
        setProgress(progress + 1);
        console.log(progress);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [progress, maxtime, ws]);
  

  const handleChangeProgress = (event) => {
    ws.send(JSON.stringify({ timestamp: parseFloat(event.target.value)}));
    setProgress(parseInt(event.target.value));
  };

  return (
    <div className="App">
      <SwimmingPool gender={values.gender} pool={pool}/>
      <SettingsContainer values={values} setValues={setValues} showInputs={showInputs} setShowInputs={setShowInputs} />
      <input
        type="range"
        min={mintime}
        max={maxtime}
        value={progress}
        onChange={handleChangeProgress}
      />
    </div>
  );
}

export default App;
