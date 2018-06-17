import React, { Component } from 'react';
import './index.css';

class Forecast extends Component {
  render() {
    return (
      <div className="forecast">
        <span className="forecast__title">{this.props.title}</span>
        <img className="forecast__icon" alt="icon" src={`svg/${this.props.icon}.svg`} />
        {this.props.children}
      </div>
    )
  }
}
export default Forecast;
