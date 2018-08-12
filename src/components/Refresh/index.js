import React, { Component } from 'react';
import rAFTimeout from '../../helpers/rAFTimeout';
import UIRefresh from './ui';

class Refresh extends Component {
  constructor() {
    super();

    this.view = React.createRef();
    this.getClass = this.getClass.bind(this)
  }

  animate() {
    rAFTimeout(() => this.view.current.classList.add('animate-in'), 350);
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
      <UIRefresh ref={this.view} getClass={this.getClass} {...this.props} />
    )
  }
}

export default Refresh;
