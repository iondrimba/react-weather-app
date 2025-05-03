import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ForeCastTemperature from '../Forecast/Temperature';
import ForeCast from '../Forecast';
import RainProbability from '../RainProbability';

class ForecastHourly extends PureComponent {
  render() {
    return (
      <section className="forecasts__period swiper-slide">
        {
          this.props.foreCastHourly.map((item, index) => 
          <ForeCast key={`hourly-${index}`} id={`hourly-${index}`} title={`${item.time}:00`} icon={item.icon} animationDelay={index}>
            <ForeCastTemperature temperature={item.temperature} />
            <RainProbability probability={item.rainProbability} />
          </ForeCast>)
        }
      </section>
    )
  }
}

ForecastHourly.propTypes = {
  foreCastHourly: PropTypes.array,
};

export default ForecastHourly;
