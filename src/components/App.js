import React from 'react';
import logo from '../logo.svg';
import './App.css';
import LiveBoard from '../containers/LiveBoard';
import Piece from './Piece';

const App = () => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to React</h2>
    </div>
    <Piece color="black" name="flag" />
    <LiveBoard />
  </div>
);

export default App;
