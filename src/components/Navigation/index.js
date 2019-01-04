import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import rAFTimeout from '../../helpers/rAFTimeout';
import './index.scss';

class Navigation extends PureComponent {
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
      <section ref={this.navigation} className={`navigation ${this.props.currentForecast}`}>
        <div className="navigation__dot"></div>
        <div className="navigation__dot"></div>
      </section>
    )
  }
}

Navigation.propTypes = {
  currentForecast: PropTypes.string.isRequired
};

export default Navigation;
