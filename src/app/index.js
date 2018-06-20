import React, { Component } from 'react';
import './index.css';
import IpFetcher from '../helpers/ipfetcher';
import IpGeoLocation from '../api/ipGeoLocation';
import ForeCastAPI from '../api/foreCastAPI';
import initialState from '../initialState';
import Home from './Home';
import Loader from '../components/Loader';

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
        {
          !this.state.dataLoaded ? <Loader /> : <Home currentCondition={this.state.currentCondition}
            foreCastDaily={this.state.foreCastDaily} foreCastHourly={this.state.foreCastHourly} />
        }
      </div>
    );
  }
}

export default App;
