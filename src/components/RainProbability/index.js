import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import svg from '../../svg/rain-probality.svg';
import './index.scss';

class RainProbability extends PureComponent {
  render() {
    return (
      <div className="rain">
        <img width="24" height="24" className="rain__icon" src={svg} alt={`rain probability ${this.props.probability}`} />
        <span className="rain__probability">{`${this.props.probability}%`}</span>
      </div>
    )
  }
}

RainProbability.propTypes = {
  probability: PropTypes.number.isRequired
};

export default RainProbability;
