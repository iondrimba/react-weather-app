import React from 'react';
import PropTypes from 'prop-types';
import svg from '../../svg/rain-probality.svg';
import './index.scss';

const RainProbability = ({ probability }) => (
  <div className="rain">
    <img width="24" height="24" className="rain__icon" src={svg} alt={`rain probability ${probability}`} />
    <span className="rain__probability">{`${probability}%`}</span>
  </div>
);

RainProbability.propTypes = {
  probability: PropTypes.number.isRequired
};

export default RainProbability;
