import React from 'react';
import './Counter.css';
import PieProgress from './PieProgress';

const Counter = ({ count, size, progress }) => (
  <div className="counter">
    <PieProgress
      size={size}
      color="#495664"
      barsize={14}
      progress={progress}/>
    <span className="counter__number">{count}</span>
  </div>
);

export default Counter;