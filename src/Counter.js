import React, { Component } from 'react';
import './Counter.css';

class Counter extends Component {
    render() {
        return (
            <div className="counter">{this.props.count}</div>
        );
    }
}

export default Counter;