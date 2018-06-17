
import React, { Component } from 'react';
import './index.css';

class Temperature extends Component {
  componentDidMount() {
    requestAnimationFrame(() => {
      document.querySelector('.temperature__status').classList.add('animate-in');
      document.querySelector('.temperature__value').classList.add('animate-in');
      document.querySelector('.temperature__unit').classList.add('animate-in');
    });
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
