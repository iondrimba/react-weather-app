import React, { Component } from 'react';
import rAFTimeout from '../../helpers/rAFTimeout';
import './index.scss';

class DateCurrent extends Component {
  animate() {
    rAFTimeout(() => this.text.classList.add('animate-in'), 400);
  }

  componentDidMount() {
    this.text = document.querySelector('.date-current__text');

    rAFTimeout(() => this.animate(), 350);
  }

  render() {
    return (
      <section className="date-current">
        <span className="date-current__text">{this.props.date}</span>
      </section>
    )
  }
}

export default DateCurrent;
