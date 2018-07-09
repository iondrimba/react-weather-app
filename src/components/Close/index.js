import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rAFTimeout from '../../helpers/rAFTimeout';
import './index.scss';

class Close extends Component {
  constructor() {
    super();

    this.text = React.createRef();
    this.onClick = this.onClick.bind(this);
  }

  animate() {
    // rAFTimeout(() => this.text.current.classList.add('animate-in'), 400);
  }

  onClick() {
    this.props.onCloseClick();
  }

  componentDidMount() {
    // rAFTimeout(() => this.animate(), 350);

  }

  render() {
    return (
      <button type="button" className="button-close" aria-label="Close view" onClick={this.onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    )
  }
}

Close.propTypes = {
  onCloseClick: PropTypes.func
};

export default Close;
