import './css/App.css';
import './components/SwimmingPool'
import SwimmingPool from './components/SwimmingPool';
import Settings from './components/Settings';
import { useState } from 'react';

function App() {

  const [gender, setGender] = useState("masculin");


  return (
    <div className="App">
      <SwimmingPool gender={gender}/>
      <Settings gender={gender} setGender={setGender}/>
      
    </div>
  );
}

export default App;
