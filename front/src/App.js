import './css/App.css';
import './components/SwimmingPool';
import SwimmingPool from './components/SwimmingPool';
import Pool from './class/Pool';
import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Settings from './components/Settings';
import ProgressBar from './components/ProgressBar';

function App() {
  const address = 'ws://localhost:8080?file=dynamic5';

  const [pool, setPool] = useState(new Pool());
  const [settings, setSettings] = useState(() => {
    const storedValues = localStorage.getItem('settings');
    return storedValues ? JSON.parse(storedValues) : {
      margeV: 0,
      margeH: 2,
      ancreV: 0,
      ancreH: 0,
      gender: 'male',
      zone: 'pool',
    };
  });

useEffect(() => {
  setPool((currentPool) => {
    const newPool = Object.create(
      Object.getPrototypeOf(currentPool),
      Object.getOwnPropertyDescriptors(currentPool)
    );
    newPool.setOrigineCoordX(settings.ancreH);
    newPool.setOrigineCoordY(settings.ancreV);
    return newPool;
  });
}, [settings.ancreH, settings.ancreV]);

  const [activeTab, setActiveTab] = useState('pool');

  const [progress, setProgress] = useState(0);
  const [[mintime,maxtime], setMinMaxTime] = useState([0,100]);
  //const [data, setData] = useState(null);
  const [ws, setWs] = useState(null);

  let content
  switch (activeTab) {
    case 'pool':
      content = <SwimmingPool className="main" pool={pool} settings={settings} isSettings={false} />;
      break;
    case 'settings':
      content = <Settings pool={pool} settings={settings} setSettings={setSettings} />;
      break;
    case 'statistics':
        content = <p> test</p>;
        break;
    default:
      content = 'pool';
      break;
  }

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const newWs = new WebSocket(address); // Adresse du serveur WebSocket
    setWs(newWs);
    
    newWs.addEventListener('open', () => {
      newWs.send(JSON.stringify({ timestamp: 0}));
    });

    newWs.onmessage = (event) => {
      const data = JSON.parse(event.data);
      //console.log(data);
      if (data.TimeData) {
        setMinMaxTime([data.TimeData.firstTime / 1000, data.TimeData.lastTime / 1000]);
      }
      if (data.time) {
        setProgress(data.time);
      }
      if (data.x && data.y) {
        const { time, acquisitionTime, anchor, x, y, z, precision, speed, direction } = data;
        setPool((currentPool) => {
          const newPool = Object.create(
            Object.getPrototypeOf(currentPool),
            Object.getOwnPropertyDescriptors(currentPool)
          );
          newPool.movePlayerOrAdd(time, acquisitionTime, anchor, x, y, z, precision, speed, direction);
          return newPool;
        });
      }
    };
  
    return () => {
      newWs.close();
    };

  }, []);

  const [isLandscape, setIsLandscape] = useState(window.matchMedia("(orientation: landscape)").matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(orientation: landscape)");
    const handleOrientationChange = (e) => setIsLandscape(e.matches);
    mediaQuery.addEventListener('change', handleOrientationChange);

    return () => {
      mediaQuery.removeEventListener('change', handleOrientationChange);
    };
  }, []);

  function handleChange(newProgress) {
    ws.send(JSON.stringify({ timestamp: parseFloat(newProgress) }));
    setProgress(parseInt(newProgress));
  }

  function play() {
    ws.send(JSON.stringify({ play: true , timestamp: parseFloat(progress) }));
    //console.log('play');
  }

  function pause() {
    ws.send(JSON.stringify({ pause: true }));
    //console.log('pause');
  }

  return (
    <div className="App">
      {isLandscape ? (
        <div>
          <NavBar activeTab={activeTab} setActiveTab={setActiveTab} settings={settings} setSettings={setSettings}/>
          <div className="content">
            {content}
          <ProgressBar minTime={mintime} maxTime={maxtime} progress={progress} handleChange={handleChange} play={play} pause={pause} />
          </div>
        </div>
      ) : (
        <div className='portrait'>
          Cette application ne fonctionne qu'en mode paysage :-(
        </div>
      )}
    </div>
  );
}

export default App;
