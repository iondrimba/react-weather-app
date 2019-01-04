import React, { PureComponent } from 'react';
import rAFTimeout from '../../helpers/rAFTimeout';
import './index.scss';

class Loader extends PureComponent {
  constructor() {
    super();

    this.loader = React.createRef();
    this.circle = React.createRef();
    this.rays = [];
  }

  animateIn() {
    this.animateCircle();

    rAFTimeout(() => this.animateRays(), 300);

    rAFTimeout(() => this.startRotation(), 500);
  }

  animateRays() {
    this.rays.map((element, index) => {
      rAFTimeout(() => element.classList.add('animate-in'), index * 80);

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
    rAFTimeout(() => this.circle.current.classList.add('animate-out'), 550);

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
          {
            [0, 1].map((index) => <div key={`ray_${index}`} className="rays">
              <div className="ray ray--north"></div>
              <div className="ray ray--west"></div>
              <div className="ray ray--south"></div>
              <div className="ray ray--east"></div>
            </div>)
          }
        </div>
      </div>
    )
  }
}

export default Loader;
