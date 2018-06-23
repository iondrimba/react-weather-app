import React, { Component, Fragment } from 'react';
import ForeCast from '../components/Forecast';
import ForeCastTemperature from '../components/Forecast/Temperature';
import Location from '../components/Location';
import Temperature from '../components/Temperature';
import Navigation from '../components/Navigation';
import RainProbality from '../components/RainProbality';
import DateCurrent from '../components/DateCurrent';

class Home extends Component {
  render() {
    return <Fragment>
        <Location location={this.props.currentCondition.location} />
        <DateCurrent date='Fry, 18, 2018' />
        <Temperature weather={this.props.currentCondition.weather} temperature={this.props.currentCondition.temperature} />

        <section className="forecasts">
          <Navigation />

          <div className="forecasts__scroll-panel">
            <section className="forecasts__period">
              {
                this.props.foreCastHourly.map((item, index) => {
                  return <ForeCast key={`hourly-${index}`} id={`hourly-${index}`} title={`${item.time}:00`} icon={item.icon} animationDelay={index}>
                    <ForeCastTemperature temperature={item.temperature} />
                    <RainProbality probability={item.rainProbability} />
                  </ForeCast>
                })
              }
            </section>

            <section className="forecasts__period forecasts--daily">
              {
                this.props.foreCastDaily.map((item, index) => {
                  return <ForeCast key={`daily-${index}`} id={`daily-${index}`} title={item.weekDay} icon={item.icon} animationDelay={index}>
                    <div>
                      <ForeCastTemperature temperature={item.temperature.max} />
                      <ForeCastTemperature temperature={item.temperature.min} />
                    </div>
                    <RainProbality probability={item.rainProbability} />
                  </ForeCast>
                })
              }
            </section>
          </div>
        </section>
    </Fragment>
  }
}

export default Home;
