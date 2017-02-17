import React from 'react';
import './Button.css';

const Button = ({ size, active, incorrect, pos, handleButtonPress }) => {
  const handleClick = function(e) {
      handleButtonPress(pos);
  };
  const classes = `button ${pos}${active && !incorrect ? ' active' : ''}${incorrect ? ' incorrect' : ''}`;
  return (
    <button 
      style={{transformOrigin: pos, height: size, width: size}}
      className={classes}
      onClick={handleClick}/>
  )
}

export default Button;
