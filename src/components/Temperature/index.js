import React, { Component } from 'react';
import rAFTimeout from '../../helpers/rAFTimeout';
import './index.css';

class Temperature extends Component {
  animate() {
    rAFTimeout(() => this.status.classList.add('animate-in'), 250);
    rAFTimeout(() => this.value.classList.add('animate-in'), 350);
    rAFTimeout(() => this.unit.classList.add('animate-in'), 400);
  }

  componentDidMount() {
    this.status = document.querySelector('.temperature__status');
    this.value = document.querySelector('.temperature__value');
    this.unit = document.querySelector('.temperature__unit');

    rAFTimeout(() => this.animate(), 400);
  }

  render() {
    return (
      <section className="current-condition">
        <div className="wrapper-temperature">
          <span className="temperature__status">{this.props.weather}</span>
          <div className="temperature">
            <span className="temperature__value">{this.props.temperature}</span>
            <div className="temperature__unit">
              <span className="temperature__unit-dot"></span>
              <span className="temperature__unit-letter">c</span>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Temperature;
