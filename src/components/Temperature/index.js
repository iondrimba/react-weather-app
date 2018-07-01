import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rAFTimeout from '../../helpers/rAFTimeout';
import './index.scss';

class Temperature extends Component {
  constructor() {
    super();

    this.status = React.createRef();
    this.value = React.createRef();
    this.unit = React.createRef();
  }

  animate() {
    rAFTimeout(() => this.status.current.classList.add('animate-in'), 150);
    rAFTimeout(() => this.value.current.classList.add('animate-in'), 250);
    rAFTimeout(() => this.unit.current.classList.add('animate-in'), 300);
  }

  componentDidMount() {
    rAFTimeout(() => this.animate(), 400);
  }

  render() {
    return (
      <section className="current-condition">
        <div className="wrapper-temperature">
          <span ref={this.status} className="temperature__status">{this.props.weather}</span>
          <div className="temperature">
            <span ref={this.value} className="temperature__value">{this.props.temperature}</span>
            <div ref={this.unit} className="temperature__unit">
              <span className="temperature__unit-dot"></span>
              <span className="temperature__unit-letter">c</span>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

Temperature.propTypes = {
  weather: PropTypes.string.isRequired,
  temperature: PropTypes.string.isRequired
};

export default Temperature;
