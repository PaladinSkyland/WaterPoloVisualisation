import React from 'react';
import '../css/NavBar.css';
function NavBar({ activeTab, setActiveTab }) {
  return (
    <div className='NavBar'>
      <button onClick={() => setActiveTab('home')} style={activeTab === 'home' ? { backgroundColor: 'gray' } : null}>
        Home
      </button>
      <button onClick={() => setActiveTab('settings')} style={activeTab === 'settings' ? { backgroundColor: 'gray' } : null}>
        Settings
      </button>
      <button onClick={() => setActiveTab('about')} style={activeTab === 'about' ? { backgroundColor: 'gray' } : null}>
        Statistique
      </button>
    </div>
  );
}

export default NavBar;