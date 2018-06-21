import React, { Component } from 'react';
import rAFTimeout from '../../helpers/rAFTimeout';
import './index.scss';

class Loader extends Component {
  animate() {
    this.rays.map((element, index) => {
      rAFTimeout(() => element.classList.add('animate-in'), index * 50);
    });

    rAFTimeout(() => this.animate(), 350);
  }

  componentDidMount() {
    this.rays = [...document.querySelectorAll('.ray')];

    this.animate();
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
