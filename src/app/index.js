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
import Home from './Home';

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
        <Home currentCondition={this.state.currentCondition} foreCastDaily={this.state.foreCastDaily} foreCastHourly={this.state.foreCastHourly}/>
      </div>
    );
  }
}

export default App;
