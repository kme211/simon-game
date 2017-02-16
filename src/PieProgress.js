import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';

class PieProgress extends Component {
  render() {
    const width = this.props.size;
    const height = this.props.size;
    
    const length = (width * 2) * Math.PI;
    
    const cx = width / 2,
      cy = height / 2,
      startAngle = 0;

    const barsize = this.props.barsize;

    const r = Math.min(cx, cy) - barsize / 2;
    let percentage = 100 * this.props.progress;

    if (percentage === 100) {
      percentage -= 0.0001;
    }
    const endAngle = startAngle + percentage * Math.PI * 2 / 100;

    const x1 = cx + r * Math.sin(startAngle),
      y1 = cy - r * Math.cos(startAngle);
    
    return (
      <Motion style={{
          endAngle: spring(endAngle),
          strokeDashOffset: spring(length - (length * this.props.progress))
        }}>
        
      {({endAngle, strokeDashOffset}) =>
        <svg 
        width={width} 
        height={height}>
        
        <ellipse 
          rx={cx - barsize / 2} 
          ry={cy - barsize / 2}
          cx={cx} 
          cy={cy} 
          stroke="#f2f2f2" 
          fill="none" 
          strokeWidth={barsize}/>
        
        <path 
          fill="none" 
          strokeWidth={barsize} 
          stroke={this.props.color} 
          d={`M${x1},${y1} A${r},${r} 0 ${endAngle - startAngle > Math.PI ? 1 : 0} 1 ${cx + r * Math.sin(endAngle)},${cy - r * Math.cos(endAngle)}`}
          style={{
            strokeDasharray: `${length}, ${length}`,
            strokeDashoffset: `${strokeDashOffset}`
          }}/>
      </svg>
      }
      
      
      </Motion>
    );
  }
}

export default PieProgress;