import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rAFTimeout from '../../helpers/rAFTimeout';
import UIInfo from './ui';

class Info extends Component {
  constructor() {
    super();

    this.button = React.createRef();
    this.onClick = this.onClick.bind(this);
  }

  animate() {
    rAFTimeout(() => this.button.current.classList.add('animate-in'), 500);
  }

  onClick() {
    this.props.onInfoClick();
  }

  componentDidMount() {
    rAFTimeout(() => this.animate(), 350);

  }

  render() {
    return (
      <UIInfo ref={this.button} onClick={this.onClick} />
    )
  }
}

Info.propTypes = {
  onInfoClick: PropTypes.func
};

export default Info;
