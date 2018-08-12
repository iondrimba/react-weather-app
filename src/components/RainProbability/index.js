import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const RainProbability = ({ probability }) => (
  <div className="rain">
    <img width="24" height="24" className="rain__icon" src="/svg/rain-probality.svg" alt="alt" />
    <span className="rain__probability">{`${probability}%`}</span>
  </div>
);

RainProbability.propTypes = {
  probability: PropTypes.number.isRequired
};

export default RainProbability;
