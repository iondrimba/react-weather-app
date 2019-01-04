import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import rAFTimeout from '../../helpers/rAFTimeout';
import './index.scss';

class DateCurrent extends PureComponent {
  constructor() {
    super();

    this.text = React.createRef();
  }

  animate() {
    rAFTimeout(() => this.text.current.classList.add('animate-in'), 400);
  }

  componentDidMount() {
    rAFTimeout(() => this.animate(), 350);
  }

  render() {
    return (
      <section className="date-current">
        <span ref={this.text} className="date-current__text">
          {this.props.date}
        </span>
      </section>
    )
  }
}

DateCurrent.propTypes = {
  date: PropTypes.string.isRequired
};

export default DateCurrent;
