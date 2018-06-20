import React, { Component } from 'react';
import rAFTimeout from '../../helpers/rAFTimeout';
import './index.scss';

class Loader extends Component {
  animate() {
    // rAFTimeout(() => this.icon.classList.add('animate-in'), 250);
    // rAFTimeout(() => this.text.classList.add('animate-in'), 350);
  }

  componentDidMount() {
    // this.icon = document.querySelector('.location__icon');
    // this.text = document.querySelector('.location__text');

    rAFTimeout(() => this.animate(), 350);
  }

  render() {
    return (
      <div className="loader">
        <div className="loader__circle"></div>
        <div className="loader__rays loader__rays--south"></div>
        <div className="loader__rays loader__rays--north"></div>
        <div className="loader__rays loader__rays--west"></div>
        <div className="loader__rays loader__rays--east"></div>
      </div>
    )
  }
}

export default Loader;
