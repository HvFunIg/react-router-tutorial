import logo from './logo.svg';
import './App.css';

import React from 'react';
import GameTick from './components/GameTick';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <GameTick />
    
      </header>
    </div>
  );
}

export default App;
