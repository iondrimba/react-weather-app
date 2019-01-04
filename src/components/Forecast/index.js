import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import rAFTimeout from '../../helpers/rAFTimeout';
import './index.scss';
import { icons } from '../../helpers/icons';

class Forecast extends PureComponent {
  constructor() {
    super();

    this.forecast = React.createRef();
  }

  animate() {
    rAFTimeout(() => this.forecast.current.classList.add('animate-in'), 100);

    rAFTimeout(() => this.title.classList.add('animate-in'), 200);

    rAFTimeout(() => this.icon.classList.add('animate-in'), 250);

    rAFTimeout(() => {
      this.temperature.map(elment => elment.classList.add('animate-in'));
    }, 350);

    rAFTimeout(() => this.rain.classList.add('animate-in'), 400);
  }

  componentDidMount() {
    this.title = this.forecast.current.querySelector('.forecast__title');
    this.icon = this.forecast.current.querySelector('.forecast__icon');
    this.temperature = [...this.forecast.current.querySelectorAll('.forecast__temperature')];
    this.rain = this.forecast.current.querySelector('.rain');

    rAFTimeout(() => this.animate(), this.props.animationDelay * 100);
  }

  render() {
    return (
      <div ref={this.forecast} className="forecast" data-id={this.props.id}>
        <span className="forecast__title">{this.props.title}</span>
        <img className="forecast__icon" alt="icon" src={icons[this.props.icon]} />

        {this.props.children}
      </div>
    )
  }
}

Forecast.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  animationDelay: PropTypes.number.isRequired,
  children: PropTypes.any.isRequired,
};

export default Forecast;
