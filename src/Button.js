import React, { Component } from 'react';
import './Button.css';
import { Motion, spring } from 'react-motion';

class Button extends Component {
  render() {
    const handleClick = function(e) {
        this.props.handleButtonPress(this.props.id);
    }.bind(this);
    return (
        <Motion style={{scale: spring(this.props.active ? 1.25 : 1), border: spring(this.props.active ? 10 : 5)}}>
            {({ scale, border }) => 
                <div 
                    className="button" 
                    onClick={handleClick}
                    style={{
                        transform: `scale(${scale}, ${scale})`, 
                        color: this.props.color
                    }}>
                    <div className="button__border" style={{
                        border: `${border}px solid currentColor`
                    }}>
                        <div className="button__inner"/>
                    </div>
                </div>
            }
        </Motion>
    );
  }
}

export default Button;
