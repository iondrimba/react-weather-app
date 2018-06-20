import React, { Component } from 'react';
import './index.css';
import IpFetcher from '../helpers/ipfetcher';
import IpGeoLocation from '../api/ipGeoLocation';
import ForeCastAPI from '../api/foreCastAPI';
import ForeCast from '../components/Forecast';
import ForeCastTemperature from '../components/Forecast/Temperature';
import initialState from '../initialState';
import Location from '../components/Location';
import Temperature from '../components/Temperature';
import Navigation from '../components/Navigation';
import RainProbality from '../components/RainProbality';

class App extends Component {
  constructor() {
    super();

    this.ipFetcher = new IpFetcher();
    this.ipGeoLocation = new IpGeoLocation();
    this.foreCastAPI = new ForeCastAPI();

    this.state = { ...initialState };

    this.init();
  }

  async init() {
    await this.ipFetcher.fetch();
    await this.ipGeoLocation.fetch(this.ipFetcher.ip);
    await this.foreCastAPI.fetch(this.ipGeoLocation.data.latitude, this.ipGeoLocation.data.longitude);
  }

  render() {
    return (
      <div className="App">
        <Location location={this.state.currentCondition.location} />
        <Temperature weather={this.state.currentCondition.weather} temperature={this.state.currentCondition.temperature} />

        <section className="forecasts">
          <Navigation />

          <div className="forecasts__scroll-panel">
            <section className="forecasts__period">
              {
                this.state.foreCastHourly.map((item, index) => {
                  return <ForeCast key={`hourly-${index}`} id={`hourly-${index}`} title={`${item.time}:00`} icon={item.icon} animationDelay={index}>
                    <ForeCastTemperature temperature={item.temperature} />
                    <RainProbality probability={item.rainProbability} />
                  </ForeCast>
                })
              }
            </section>

            <section className="forecasts__period forecasts--daily">
              {
                this.state.foreCastDaily.map((item, index) => {
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
      </div>
    );
  }
}

export default App;
