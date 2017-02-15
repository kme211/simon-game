import React, { Component } from 'react';
import './Button.css';
import { Motion, spring } from 'react-motion';

class Button extends Component {
  render() {
    const handleClick = function(e) {
        this.props.handleButtonPress(this.props.id);
    }.bind(this);
    const classes = `button ${this.props.pos}${this.props.active ? ' active' : ''}`;
    return (
        <Motion style={{scale: spring(this.props.active ? 1.25 : 1), border: spring(this.props.active ? 10 : 5)}}>
            {({ scale, border }) => 
                <div 
                  className={classes}
                  onClick={handleClick}>
                  
                </div>  
            }
        </Motion>
    );
  }
}

export default Button;
