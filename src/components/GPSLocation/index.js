import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import rAFTimeout from '../../helpers/rAFTimeout';
import './index.scss';

class GPSLocation extends PureComponent {
  constructor() {
    super();

    this.button = React.createRef();
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  animate() {
    rAFTimeout(() => this.button.current.classList.add('animate-in'), 430);
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

  render() {
    return (
      <button ref={this.button} type="button" className="gps-location" aria-label="Get current location" onTouchStart={this.onMouseDown} onTouchEnd={this.onMouseUp} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} onClick={this.props.onGPSLocationClick}>
        <svg xmlns="http://www.w3.org/2000/svg" id="gpslocation" viewBox="0 0 96 96">
          <g id="XMLID_1_">
            <circle id="XMLID_3_" cx="48" cy="48" r="9.8" />
            <path id="XMLID_6_" d="M80.5 44.8h-6.7C72.3 33 63 23.7 51.3 22.2v-6.7h-6.5v6.7C33 23.7 23.7 33 22.2 44.8h-6.7v6.5h6.7C23.7 63 33 72.3 44.8 73.8v6.7h6.5v-6.7C63 72.3 72.3 63 73.8 51.3h6.7v-6.5zM48 67.5c-10.8 0-19.5-8.7-19.5-19.5S37.2 28.5 48 28.5 67.5 37.2 67.5 48 58.8 67.5 48 67.5z" />
          </g>
        </svg>
      </button>
    )
  }
}

GPSLocation.propTypes = {
  onGPSLocationClick: PropTypes.func
};

export default GPSLocation;
