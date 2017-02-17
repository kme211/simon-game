import React from 'react';
import './Button.css';
import { OUTCOME_WON } from './constants';

const Button = ({ outcome, size, active, incorrect, pos, handleButtonPress }) => {
  const handleClick = function(e) {
      handleButtonPress(pos);
  };
  let styles = {
    transformOrigin: pos, 
    height: size, 
    width: size
  };

  if(outcome === OUTCOME_WON) {
    styles = Object.assign(
      {},
      styles,
      {
        animationName: 'game-won-button',
        animationIterationCount: 'infinite', 
        animationDuration: '8s',
        animationTimingFunction: 'ease-in-out'
      }
    );
  }

  const classes = `button ${pos}${active && !incorrect ? ' active' : ''}${incorrect ? ' incorrect' : ''}`;
  return (
    <button 
      style={styles}
      className={classes}
      onClick={handleClick}/>
  )
}

export default Button;
