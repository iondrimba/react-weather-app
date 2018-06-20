import React, { Component } from 'react';
import rAFTimeout from '../../helpers/rAFTimeout';
import './index.css';

class Navigation extends Component {
  animate() {
    rAFTimeout(() => {
      this.dots.map((elment, index) => {
        return rAFTimeout(() => {
          elment.classList.add('animate-in')
        }, index * 150);
      });
    }, 350);
  }

  componentDidMount() {
    this.dots = [...document.querySelectorAll('.navigation__dot')];

    rAFTimeout(() => this.animate(), 350);
  }

  render() {
    return (
      <section className="navigation">
        <div className="navigation__dot"></div>
        <div className="navigation__dot"></div>
      </section>
    )
  }
}

export default Navigation;


