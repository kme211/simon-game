import React from 'react';
import './Counter.css';
import PieProgress from './PieProgress';

const Counter = ({ count, size }) => (
  <div className="counter">
    <PieProgress
      size={size}
      color="#495664"
      barsize={14}
      progress={count / 20}/>
    <span className="counter__number">{count}</span>
  </div>
);

export default Counter;