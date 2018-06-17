import React, { Component } from 'react';
import './index.css';
import IpFetcher from '../helpers/ipfetcher';
import IpSearch from '../api/ipSearch';
import CurrentCondition from '../api/currentCondition';
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
    this.ipSearch = new IpSearch();
    this.currentCondition = new CurrentCondition();
    this.foreCastAPI = new ForeCastAPI();

    this.state = { ...initialState };

    this.init();
  }

  async init() {
    await this.ipFetcher.fetch();
    await this.ipSearch.fetchLocation(this.ipFetcher.ip);
    await this.currentCondition.fetch(this.ipSearch.data.Key);
    await this.foreCastAPI.fetch5Days(this.ipSearch.data.Key);
    await this.foreCastAPI.fetch12hours(this.ipSearch.data.Key);
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
                this.state.foreCastHourly.map((item) => {
                  return <ForeCast title={`${item.time}:00`} icon={item.icon}>
                    <ForeCastTemperature temperature={item.temperature} />
                    <RainProbality probability={item.rainProbability} />
                  </ForeCast>
                })
              }
            </section>

            <section className="forecasts__period forecasts--daily">
              {
                this.state.foreCastDaily.map((item) => {
                  return <ForeCast title={item.weekDay} icon={item.icon}>
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
