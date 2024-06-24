import React from 'react';
import '../css/NavBar.css';
import Zone from './Zone';

function NavBar({ activeTab, setActiveTab, settings, setSettings }) {

  return (
    <div className='NavBar'>
      <div className='tab-container'>
      <img
        className={`logo ${activeTab === 'pool' ? 'clicked' : ''}`}
        src={process.env.PUBLIC_URL + '/assets/pool.svg'}
        alt="pool logo"
        onClick={() => setActiveTab('pool')}
      />
      <img
        className={`logo ${activeTab === 'settings' ? 'clicked' : ''}`}
        src={process.env.PUBLIC_URL + '/assets/settings.svg'}
        alt="settings logo"
        onClick={() => setActiveTab('settings')}
      />
      <img
        className={`logo ${activeTab === 'statistics' ? 'clicked' : ''}`}
        src={process.env.PUBLIC_URL + '/assets/stats.svg'}
        alt="statistics logo"
        onClick={() => setActiveTab('statistics')}
      />
      </div>
      <div className='zone'>
        {activeTab === 'pool' && <Zone value={settings.zone} settings={settings} setSettings={setSettings}></Zone>}
      </div>
    </div>
    
  );
}

export default NavBar;
