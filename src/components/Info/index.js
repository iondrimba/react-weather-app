import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rAFTimeout from '../../helpers/rAFTimeout';
import './index.scss';

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
      <button ref={this.button} type="button" className="button-info" aria-label="Information" onClick={this.props.onInfoClick}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 0C5.371 0 0 5.371 0 12s5.371 12 12 12 12-5.371 12-12S18.629 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 3.813c-.184 0-.336-.004-.5.03a1.127 1.127 0 0 0-.438.22.98.98 0 0 0-.28.375c-.071.152-.095.332-.095.562 0 .227.024.406.094.563.07.156.16.28.281.375.122.093.274.148.438.187.164.04.316.063.5.063.18 0 .371-.024.531-.063.16-.04.285-.094.406-.188a.951.951 0 0 0 .282-.375c.07-.152.125-.335.125-.562 0-.23-.055-.41-.125-.563a.98.98 0 0 0-.281-.375c-.122-.093-.247-.183-.407-.218-.16-.035-.351-.032-.531-.032zm-1.219 3.343v8.969h2.438V9.156z" />
        </svg>
      </button>
    )
  }
}

Info.propTypes = {
  onInfoClick: PropTypes.func
};

export default Info;
