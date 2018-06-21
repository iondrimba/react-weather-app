import React, { Component } from 'react';
import './index.scss';
import IpFetcher from '../helpers/ipfetcher';
import IpGeoLocation from '../api/ipGeoLocation';
import ForeCastAPI from '../api/foreCastAPI';
import initialState from '../initialState';
import Home from './Home';
import Loader from '../components/Loader';
import rAFTimeout from '../helpers/rAFTimeout';

class App extends Component {
  constructor() {
    super();

    this.ipFetcher = new IpFetcher();
    this.ipGeoLocation = new IpGeoLocation();
    this.foreCastAPI = new ForeCastAPI();

    this.state = { ...initialState };

    this.loader = React.createRef();

    this.init();
  }

  async init() {
    await this.ipFetcher.fetch();
    await this.ipGeoLocation.fetch(this.ipFetcher.ip);
    await this.foreCastAPI.fetch(this.ipGeoLocation.data.latitude, this.ipGeoLocation.data.longitude);
  }

  componentDidMount() {
    rAFTimeout(() => this.loader.current.animateIn(), 100);

    setTimeout(() => {
      this.loader.current.animateOut();

      setTimeout(() => {
        //this.setState({ dataLoaded: true });
      }, 400);
    }, 1000);
  }

  render() {
    return (
      <div className="App">
        {
          !this.state.dataLoaded ? <Loader ref={this.loader} /> : <Home currentCondition={this.state.currentCondition}
            foreCastDaily={this.state.foreCastDaily} foreCastHourly={this.state.foreCastHourly} />
        }
      </div>
    );
  }
}

export default App;
