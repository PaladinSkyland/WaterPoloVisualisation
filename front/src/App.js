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

  const [activeTab, setActiveTab] = useState('home');

  let content = 'home';
  switch (activeTab) {
    case 'home':
      content = <SwimmingPool pool={pool} settings={settings}/>;
      break;
    case 'settings':
      content = <Settings settings={settings} setSettings={setSettings} />;
      break;
    default:
      content = 'home';
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

  return (
    <div className="App">
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab}/>
      <div className="content">
        {content}
      </div>
    </div>
  );
}

export default App;
