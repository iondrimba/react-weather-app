import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rAFTimeout from '../../helpers/rAFTimeout';
import './index.scss';

class Refresh extends Component {
  constructor() {
    super();

    // this.button = React.createRef();
    this.onClick = this.onClick.bind(this);
  }

  // animate() {
  //   rAFTimeout(() => this.button.current.classList.add('animate-in'), 1);
  // }

  // hide() {
  //   rAFTimeout(() => this.button.current.classList.remove('animate-in'), 1);
  // }

  onClick() {
    this.props.onClick();
  }

  render() {
    return (
      <section className="refresh">
        <span className="refresh__time">{this.props.time}</span>
        <button ref={this.button} type="button" className="button-refresh" aria-label="Refresh content" onClick={this.onClick}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
            <path d="M48 15.5c-8.8 0-17 3.5-23 9.5l-6.3-6.3v19.5h19.5l-8.6-8.6C34.4 24.8 40.9 22 48 22c14.3 0 26 11.7 26 26S62.3 74 48 74 22 62.3 22 48h-6.5c0 17.9 14.6 32.5 32.5 32.5S80.5 65.9 80.5 48 65.9 15.5 48 15.5z" />
          </svg>
        </button>
      </section>

    )
  }
}

Refresh.propTypes = {
  time: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Refresh;
