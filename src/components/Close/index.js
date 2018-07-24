import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rAFTimeout from '../../helpers/rAFTimeout';
import UIClose from './ui'

class Close extends Component {
  constructor() {
    super();

    this.button = React.createRef();
    this.onClick = this.onClick.bind(this);
  }

  animate() {
    rAFTimeout(() => this.button.current.classList.add('animate-in'), 1);
  }

  hide() {
    rAFTimeout(() => this.button.current.classList.remove('animate-in'), 1);
  }

  onClick() {
    this.props.onCloseClick();
  }

  render() {
    return (
      <UIClose ref={this.button} onClick={this.onClick} />
    )
  }
}

Close.propTypes = {
  onCloseClick: PropTypes.func
};

export default Close;
