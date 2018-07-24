import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rAFTimeout from '../../helpers/rAFTimeout';
import UILocation from './ui';

class Location extends Component {
  constructor() {
    super();

    this.icon = React.createRef();
    this.text = React.createRef();
  }

  animate() {
    rAFTimeout(() => this.icon.current.classList.add('animate-in'), 250);
    rAFTimeout(() => this.text.current.classList.add('animate-in'), 350);
  }

  componentDidMount() {
    rAFTimeout(() => this.animate(), 350);
  }

  render() {
    return (
      <UILocation ref={[this.icon, this.text]} location={this.props.location} />
    )
  }
}

Location.propTypes = {
  location: PropTypes.string.isRequired
};

export default Location;
