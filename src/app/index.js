import React, { Component } from 'react';
import './index.scss';
import IpGeoLocation from '../api/ipGeoLocation';
import ForeCastAPI from '../api/foreCastAPI';
import initialState from '../initialState';
import Home from './Home';
import Loader from '../components/Loader';

import IpFetcher from '../api/ipfetcher';
import rAFTimeout from '../helpers/rAFTimeout';
import timeConvert from '../helpers/time';
import icons from '../helpers/icons';
import weekdays from '../helpers/weekdays';

class App extends Component {
  constructor() {
    super();

    this.ipFetcher = new IpFetcher();
    this.ipGeoLocation = new IpGeoLocation();
    this.foreCastAPI = new ForeCastAPI(process.env.REACT_APP_DARK_SKY_API_CODE);

    this.onGetCurrentLocation = this.onGetCurrentLocation.bind(this);

    this.state = { ...initialState };

    this.loader = React.createRef();
  }

  async init() {
    rAFTimeout(() => this.loader.current.animateIn(), 100);

    await this.ipFetcher.fetch();
    await this.ipGeoLocation.fetch(this.ipFetcher.ip);
    await this.foreCastAPI.fetch(this.ipGeoLocation.data.latitude, this.ipGeoLocation.data.longitude);

    rAFTimeout(() => {
      this.loader.current.animateOut();

      rAFTimeout(() => this.updatedState(), 600);
    }, 1000);
  }

  componentDidMount() {
    this.init();
  }

  updatedState() {
    this.setState({
      dataLoaded: true,
      currentCondition: {
        ...initialState, location: this.ipGeoLocation.data.city,
        date: timeConvert(this.foreCastAPI.data.currently.time).localeDateString,
        temperature: Math.round(this.foreCastAPI.data.currently.temperature),
        weather: this.foreCastAPI.data.currently.summary
      },
      foreCastHourly: this.foreCastAPI.data.hourly.data.slice(0, 5).map((item) => ({
        time: timeConvert(item.time).hours,
        rainProbability: Math.round(item.precipProbability * 100),
        temperature: Math.round(item.temperature),
        icon: icons(item.icon).id
      })),
      foreCastDaily: this.foreCastAPI.data.daily.data.slice(1, 6).map(item => ({
        weekDay: weekdays(timeConvert(item.time).weekDay),
        rainProbability: Math.round(item.precipProbability * 100),
        icon: icons(item.icon).id,
        temperature: {
          max: Math.round(item.temperatureMax),
          min: Math.round(item.temperatureMin)
        }
      }))
    });
  }

  async onGetCurrentLocation({ latitude, longitude }) {
    console.log('onGetCurrentLocation', latitude, longitude);
    await this.foreCastAPI.fetch(latitude, longitude);
    console.log('this.foreCastAPI', this.foreCastAPI);
    console.log('this.ipGeoLocation', this.ipGeoLocation);
    this.updatedState();
  }

  render() {
    return (
      <div className="App">
        {
          !this.state.dataLoaded ? <Loader ref={this.loader} /> : <Home currentCondition={this.state.currentCondition}
            foreCastDaily={this.state.foreCastDaily} foreCastHourly={this.state.foreCastHourly}
            onGetCurrentLocation={this.onGetCurrentLocation} />
        }
      </div>
    );
  }
}

export default App;
