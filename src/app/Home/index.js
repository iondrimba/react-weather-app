import React, { Component, Fragment } from 'react';
import Drag from '../../helpers/drag';
import ForeCast from '../../components/Forecast';
import ForeCastTemperature from '../../components/Forecast/Temperature';
import Location from '../../components/Location';
import Temperature from '../../components/Temperature';
import Navigation from '../../components/Navigation';
import RainProbability from '../../components/RainProbability';
import GPSLocation from '../../components/GPSLocation';
import Info from '../../components/Info';
import DateCurrent from '../../components/DateCurrent';
import rAFTimeout from '../../helpers/rAFTimeout';
import PropTypes from 'prop-types';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      currentForecast: 'hourly'
    };

    this.drag = new Drag();
    this.onInfoClick = this.onInfoClick.bind(this);
    this.onInfoClose = this.onInfoClose.bind(this);
  }

  animateForecastSection(forecasts, callback) {
    forecasts.map(item => rAFTimeout(() => callback(item), 300));
  }

  onDragRightStart() {
    this.animateForecastSection(this.forecasts, (item) => {
      item.classList.remove('move-right');
      item.classList.add('move-left');

      this.setState({ currentForecast: 'hourly' });
    });
  }

  onInfoClick() {
    this.props.onInfoClick();
  }

  onInfoClose() {
    this.props.onInfoClose();
  }

  onDragLeftStart() {
    this.animateForecastSection(this.forecasts, (item) => {
      item.classList.remove('move-left');
      item.classList.add('move-right');

      this.setState({ currentForecast: 'daily' });
    });
  }

  componentDidMount() {
    this.forecasts = [...document.querySelectorAll('.forecasts__period')];

    this.drag.setup(document.getElementsByClassName('forecasts__scroll-panel')[0]);

    this.drag.onDragStart(this.onDragRightStart.bind(this), this.onDragLeftStart.bind(this));
  }

  render() {
    return <Fragment>
      <GPSLocation onGetCurrentLocation={this.props.onGetCurrentLocation} />
      <Info onInfoClick={this.onInfoClick} onInfoClose={this.onInfoClose} />
      <Location location={this.props.currentCondition.location} />
      <DateCurrent date={this.props.currentCondition.date} />
      <Temperature weather={this.props.currentCondition.weather} temperature={this.props.currentCondition.temperature} />

      <section className="forecasts">
        <Navigation currentForecast={this.state.currentForecast} />

        <div className="forecasts__scroll-panel">
          <section className="forecasts__period">
            {
              this.props.foreCastHourly.map((item, index) => <ForeCast key={`hourly-${index}`} id={`hourly-${index}`} title={`${item.time}:00`} icon={item.icon} animationDelay={index}>
                <ForeCastTemperature temperature={item.temperature} />
                <RainProbability probability={item.rainProbability} />
              </ForeCast>)
            }
          </section>

          <section className="forecasts__period forecasts--daily">
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
        </div>
      </section>
    </Fragment>
  }
}

Home.propTypes = {
  foreCastHourly: PropTypes.array,
  foreCastDaily: PropTypes.array,
  currentCondition: PropTypes.object,
  onGetCurrentLocation: PropTypes.func,
  onInfoClick: PropTypes.func,
  onInfoClose: PropTypes.func
};

export default Home;
