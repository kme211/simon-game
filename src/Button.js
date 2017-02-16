import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
  render() {
    const { size, active, incorrect, pos, handleButtonPress } = this.props;
    const handleClick = function(e) {
        handleButtonPress(pos);
    }.bind(this);
    
    const classes = `button ${pos}${active && !incorrect ? ' active' : ''}${incorrect ? ' incorrect' : ''}`;
    return (
      <div 
        style={{transformOrigin: pos, height: size, width: size}}
        className={classes}
        onClick={handleClick}/>
    );
  }
}

export default Button;
