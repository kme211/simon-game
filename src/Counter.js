import React, { Component } from 'react';
import './Counter.css';
import PieProgress from './PieProgress';

class Counter extends Component {
    render() {
      const { count, size } = this.props;
      const progress = count / 20;
        return (
          <div className="counter">
            <PieProgress
              size={size}
              color="#495664"
              barsize={14}
              progress={progress}/>
            <span className="counter__number">{this.props.count}</span>
          </div>
        );
    }
}

export default Counter;