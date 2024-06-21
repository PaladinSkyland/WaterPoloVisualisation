import './css/App.css';
import './components/SwimmingPool';
import SwimmingPool from './components/SwimmingPool';
import Pool from './class/Pool';
import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Settings from './components/Settings';

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

  const [activeTab, setActiveTab] = useState('pool');

  const [progress, setProgress] = useState(0);
  const [[mintime,maxtime], setMinMaxTime] = useState([0,100]);
  //const [data, setData] = useState(null);
  const [ws, setWs] = useState(null);

  let content
  switch (activeTab) {
    case 'pool':
      content = <SwimmingPool className="main" pool={pool} settings={settings}/>;
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
      if (data.TimeData) {
        setMinMaxTime([data.TimeData.firstTime / 1000, data.TimeData.lastTime / 1000]);
      }
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
      {isLandscape ? (
        <div>
          <NavBar activeTab={activeTab} setActiveTab={setActiveTab}/>
          <div className="content">
            {content}
          </div>
          <input
        type="range"
        min={mintime}
        max={maxtime}
        value={progress}
        onChange={handleChangeProgress}
        />
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
