import React from 'react';
import './App.css';
import Persons from './containers/Persons';

function App() {
  return (
    <div className="App">
        <ol>
          <li>Turn this app into one which does NOT use local state (in components) but instead uses Redux</li>
        </ol>
        <Persons />
      </div>
  );
}

export default App;
