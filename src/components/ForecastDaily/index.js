import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ForeCastTemperature from '../Forecast/Temperature';
import ForeCast from '../Forecast';
import RainProbability from '../RainProbability';

class ForecastDaily extends PureComponent {
  render() {
    return (
      <section className="forecasts__period forecasts--daily swiper-slide">
        {
          this.props.foreCastDaily.map((item, index) => <ForeCast key={`daily-${index}`} id={`daily-${index}`} title={item.weekDay} icon={item.icon} animationDelay={index}>
            <div>
              <ForeCastTemperature temperature={item.temperature.max} />
              <ForeCastTemperature temperature={item.temperature.min} />
            </div>
            <RainProbability probability={item.rainProbability} />
          </ForeCast>)
        }
      </section>
    )
  }
}

ForecastDaily.propTypes = {
  foreCastDaily: PropTypes.array,
};

export default ForecastDaily;
