import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rAFTimeout from '../../helpers/rAFTimeout';
import './index.scss';

class Refresh extends Component {
  constructor() {
    super();

    this.view = React.createRef();
    this.button = React.createRef();
    this.getClass = this.getClass.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  animate() {
    rAFTimeout(() => this.view.current.classList.add('animate-in'), 350);
  }

  onMouseDown() {
    rAFTimeout(() => this.button.current.classList.add('press'), 1);
  }

  onMouseUp() {
    rAFTimeout(() => this.button.current.classList.remove('press'), 1);
  }

  componentDidMount() {
    rAFTimeout(() => this.animate(), 350);
  }

  getClass({ updating }) {
    let animation = '';

    if (this.view.current) {
      animation = 'animate-in';
    }

    return `refresh ${animation} ${updating ? 'fetching' : ''}`;
  }

  render() {
    return (
      <section ref={this.view} className={`${this.getClass(this.props)}`}>
        <span className="refresh__time">{this.props.time}</span>
        <button ref={this.button} type="button" className="button-refresh" aria-label="Refresh content" onTouchStart={this.onMouseDown} onTouchEnd={this.onMouseUp} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} onClick={this.props.onClick}>
          <svg viewBox="0 0 96 96">
            <path d="M48 15.5c-8.8 0-17 3.5-23 9.5l-6.3-6.3v19.5h19.5l-8.6-8.6C34.4 24.8 40.9 22 48 22c14.3 0 26 11.7 26 26S62.3 74 48 74 22 62.3 22 48h-6.5c0 17.9 14.6 32.5 32.5 32.5S80.5 65.9 80.5 48 65.9 15.5 48 15.5z" />
          </svg>
        </button>
      </section>
    )
  }
}

Refresh.propTypes = {
  onClick: PropTypes.func,
  time: PropTypes.string,
};

export default Refresh;
