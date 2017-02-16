import React from 'react';
import './StartButton.css';

const StartButton = ({ startGame, size }) => (
  <div className="start-button" style={{height: `${size}px`, width: `${size}px`}} onClick={startGame}>Start</div>
);

export default StartButton;