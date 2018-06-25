import React, { Component } from 'react';
import rAFTimeout from '../../helpers/rAFTimeout';
import './index.scss';

class Loader extends Component {
  constructor() {
    super();

    this.loader = React.createRef();
    this.circle = React.createRef();
  }

  animateIn() {
    this.animateCircle();

    rAFTimeout(() => this.animateRays(), 300);

    rAFTimeout(() => this.startRotation(), 500);
  }

  animateRays() {
    this.rays.map((element, index) => {
      rAFTimeout(() => element.classList.add('animate-in'), index * 80)
      return element;
    });
  }

  startRotation() {
    rAFTimeout(() => this.circle.current.classList.add('start-rotation'), 300);
  }

  animateCircle() {
    rAFTimeout(() => this.circle.current.classList.add('animate-in'), 150);
  }

  animateOut() {
    this.rays.map((element, index) => {
      rAFTimeout(() => element.classList.add('animate-out'), index * 50);
      return element;
    });
  }

  componentDidMount() {
    this.rays = [...this.circle.current.querySelectorAll('.ray')];
  }

  render() {
    return (
      <div ref={this.loader} className="loader">
        <div ref={this.circle} className="loader__circle">
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
