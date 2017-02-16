import React from 'react';
import './StartButton.css';

const StartButton = ({ startGame, size }) => (
  <button className="start-button" style={{height: `${size}px`, width: `${size}px`}} onClick={startGame}>Start</button>
);

export default StartButton;