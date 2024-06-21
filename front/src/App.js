import './css/App.css';
import './components/SwimmingPool';
import SwimmingPool from './components/SwimmingPool';
import Pool from './class/Pool';
import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Settings from './components/Settings';

function App() {
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
    let newPool = new Pool(currentPool);
    newPool.setOrigineCoordX(settings.ancreH);
    newPool.setOrigineCoordY(settings.ancreV);
    return newPool;
  });
}, [settings.ancreH, settings.ancreV]);

  const [activeTab, setActiveTab] = useState('pool');

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

  const [isLandscape, setIsLandscape] = useState(window.matchMedia("(orientation: landscape)").matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(orientation: landscape)");
    const handleOrientationChange = (e) => setIsLandscape(e.matches);
    mediaQuery.addEventListener('change', handleOrientationChange);

    return () => {
      mediaQuery.removeEventListener('change', handleOrientationChange);
    };
  }, []);

  return (
    <div className="App">
      {isLandscape ? (
        <div>
          <NavBar activeTab={activeTab} setActiveTab={setActiveTab}/>
          <div className="content">
            {content}
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
