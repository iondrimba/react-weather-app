import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rAFTimeout from '../../helpers/rAFTimeout';
import UINavigation from './ui';

class Navigation extends Component {
  constructor() {
    super();

    this.navigation = React.createRef();
  }

  animate() {
    rAFTimeout(() => {
      this.dots.map((elment, index) => {
        rAFTimeout(() => elment.classList.add('animate-in'), index * 150);

        return elment;
      });
    }, 350);
  }

  componentDidMount() {
    this.dots = [...this.navigation.current.querySelectorAll('.navigation__dot')];

    rAFTimeout(() => this.animate(), 350);
  }

  render() {
    return (
      <UINavigation ref={this.navigation} currentForecast={this.props.currentForecast} />
    )
  }
}

Navigation.propTypes = {
  currentForecast: PropTypes.string.isRequired
};

export default Navigation;
