import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rAFTimeout from '../../helpers/rAFTimeout';
import UIInfo from './ui';

class Info extends Component {
  constructor() {
    super();

    this.button = React.createRef();
  }

  animate() {
    rAFTimeout(() => this.button.current.classList.add('animate-in'), 500);
  }

  componentDidMount() {
    rAFTimeout(() => this.animate(), 350);
  }

  render() {
    return (
      <UIInfo ref={this.button} onClick={this.props.onInfoClick} />
    )
  }
}

Info.propTypes = {
  onInfoClick: PropTypes.func
};

export default Info;
