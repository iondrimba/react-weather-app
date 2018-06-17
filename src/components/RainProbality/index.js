import React, { Component } from 'react';
import './index.css';

class RainProbality extends Component {
  render() {
    return (
      <div className="rain">
        <img width="24" height="24" className="rain__icon" src="/svg/rain-probality.svg" alt="alt" />
        <span className="rain__probability">{`${this.props.probability}%`}</span>
      </div>
    )
  }
}

export default RainProbality;
