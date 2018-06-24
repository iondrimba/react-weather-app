import React, { Component } from 'react';
import rAFTimeout from '../../helpers/rAFTimeout';
import './index.scss';

class Navigation extends Component {
  constructor() {
    super();

    this.navigation = React.createRef();
  }

  animate() {
    rAFTimeout(() => {
      this.dots.map((elment, index) => {
        return rAFTimeout(() => {
          elment.classList.add('animate-in')
        }, index * 150);
      });
    }, 350);
  }

  componentDidMount() {
    this.dots = [...this.navigation.current.querySelectorAll('.navigation__dot')];

    rAFTimeout(() => this.animate(), 350);
  }

  render() {
    return (
      <section ref={this.navigation} className="navigation">
        <div className="navigation__dot"></div>
        <div className="navigation__dot"></div>
      </section>
    )
  }
}

export default Navigation;
