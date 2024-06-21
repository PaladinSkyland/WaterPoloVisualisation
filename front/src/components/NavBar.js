import React from 'react';
import '../css/NavBar.css';

function NavBar({ activeTab, setActiveTab }) {

  return (
    <div className='NavBar'>
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
  );
}

export default NavBar;
