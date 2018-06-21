import React, { Component } from 'react';
import rAFTimeout from '../../helpers/rAFTimeout';
import './index.scss';

class Loader extends Component {
  animateIn() {
    this.animateCircle();

    rAFTimeout(() => this.animateRays(), 300);

    rAFTimeout(() => this.startRotation(), 500);
  }

  animateRays() {
    this.rays.map((element, index) => {
      return rAFTimeout(() => element.classList.add('animate-in'), index * 80);
    });
  }

  startRotation() {
    rAFTimeout(() => this.circle.classList.add('start-rotation'), 300);
  }

  animateCircle() {
    rAFTimeout(() => this.circle.classList.add('animate-in'), 150);
  }

  animateOut() {
    this.rays.map((element, index) => {
      return rAFTimeout(() => element.classList.remove('animate-in'), index * 50);
    });
  }

  componentDidMount() {
    this.loader = document.querySelector('.loader');
    this.circle = this.loader.querySelector('.loader__circle');
    this.rays = [...document.querySelectorAll('.ray')];
  }

  render() {
    return (
      <div className="loader">
        <div className="loader__circle">
          <div className="rays">
            <div className="ray ray--north"></div>
            <div className="ray ray--west"></div>
            <div className="ray ray--south"></div>
            <div className="ray ray--east"></div>
          </div>
          <div className="rays">
            <div className="ray ray--north"></div>
            <div className="ray ray--west"></div>
            <div className="ray ray--south"></div>
            <div className="ray ray--east"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Loader;
