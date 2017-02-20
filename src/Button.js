import React from 'react';
import './Button.css';
import { OUTCOME_WON, ANIMATION_STYLES, BUTTON_ANIMATION_NAME } from './constants';

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
      ANIMATION_STYLES,
      { animationName: BUTTON_ANIMATION_NAME }
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
