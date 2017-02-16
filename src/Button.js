import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
  render() {
    const handleClick = function(e) {
        this.props.handleButtonPress(this.props.pos);
    }.bind(this);
    const { size, active, incorrect, pos } = this.props;
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
