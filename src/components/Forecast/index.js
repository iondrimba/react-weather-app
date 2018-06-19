import React, { Component } from 'react';
import rAFTimeout from '../../helpers/rAFTimeout';
import './index.css';

class Forecast extends Component {
  animate() {
    rAFTimeout(() => this.forecast.classList.add('active'), 100);

    rAFTimeout(() => this.title.classList.add('active'), 200);

    rAFTimeout(() => this.icon.classList.add('active'), 250);

    rAFTimeout(() => this.temperature.classList.add('active'), 300);

    rAFTimeout(() => this.rain.classList.add('active'), 350);
  }

  componentDidMount() {

    this.forecast = document.querySelector(`[data-id=${this.props.id}]`);
    this.title = this.forecast.querySelector('.forecast__title');
    this.icon = this.forecast.querySelector('.forecast__icon');
    this.temperature = this.forecast.querySelector('.forecast__temperature');
    this.rain = this.forecast.querySelector('.rain');

    rAFTimeout(() => this.animate(), this.props.animationDelay * 50);
  }

  render() {
    return (
      <div className="forecast" data-id={this.props.id}>
        <span className="forecast__title">{this.props.title}</span>
        <img className="forecast__icon" alt="icon" src={`svg/${this.props.icon}.svg`} />

        {this.props.children}
      </div>
    )
  }
}
export default Forecast;
