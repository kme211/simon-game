import React, { Component } from 'react';
import './Button.css';
import { Motion, spring } from 'react-motion';

class Button extends Component {
  render() {
    const handleClick = function(e) {
        this.props.handleButtonPress(this.props.id);
    }.bind(this);
    const { size, active, pos } = this.props;
    const classes = `button ${pos}${active ? ' active' : ''}`;
    return (
      <div 
        style={{height: size, width: size}}
        className={classes}
        onClick={handleClick}/>
    );
  }
}

export default Button;
