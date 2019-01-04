import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import rAFTimeout from '../../helpers/rAFTimeout';
import './index.scss';

class Location extends PureComponent {
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
      <section className="location">
        <span ref={this.icon} className="location__icon">
          <svg enableBackground="new 0 0 24 24" height="24px" id="location" version="1.1" viewBox="0 0 24 24" width="24px">
            <path d="M11.513,12.38c-2.117,0-3.835-1.729-3.835-3.862c0-2.135,1.718-3.863,3.835-3.863s3.835,1.729,3.835,3.863  C15.348,10.65,13.63,12.38,11.513,12.38 M11.513,0C6.825,0,3.025,3.827,3.025,8.549c0,4.46,3.844,10.213,6.411,13.014  c0.959,1.045,2.076,2.454,2.076,2.454s1.2-1.417,2.229-2.493C16.306,18.84,20,13.451,20,8.549C20,3.827,16.2,0,11.513,0" />
          </svg>
        </span>
        <span ref={this.text} className="location__text">{this.props.location}</span>
      </section>
    )
  }
}

Location.propTypes = {
  location: PropTypes.string.isRequired
};

export default Location;
