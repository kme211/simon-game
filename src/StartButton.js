import React, { Component } from 'react';
import './StartButton.css';

class StartButton extends Component {
    render() {
        return (
            <div className="start-button" onClick={this.props.startGame}>Start</div>
        )
    }
}

export default StartButton;