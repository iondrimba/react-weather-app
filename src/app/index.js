import React, { Component, Fragment } from 'react';
import Home from './Home';
import Info from './Info';
import Loader from '../components/Loader';
import Error from '../components/Error';
import rAFTimeout from '../helpers/rAFTimeout';
import Storage from './storage';
import './index.scss';

class App extends Component {
  constructor() {
    super();

    this.loader = React.createRef();
    this.onInfoClick = this.onInfoClick.bind(this);
    this.onInfoClose = this.onInfoClose.bind(this);
    this.onRefreshClick = this.onRefreshClick.bind(this);
    this.onGPSLocationClick = this.onGPSLocationClick.bind(this);

    this.storage = new Storage(process.env.REACT_APP_DARK_SKY_API_CODE);
    this.state = { ...this.storage.data };
  }

  async init() {
    rAFTimeout(() => this.loader.current.animateIn(), 100);

    await this.storage.fetch();

    rAFTimeout(() => {
      this.loader.current.animateOut();

      rAFTimeout(() => this.updatedState(this.storage), 600);
    }, 1000);
  }

  updatedState({ ipGeoLocation, data }) {
    if (ipGeoLocation.data && ipGeoLocation.data.error) {
      this.setState({
        error: ipGeoLocation.data.error,
        dataLoaded: true,
      });
    } else {
      this.setState({
        ...data,
        showInfo: false,
        dataLoaded: true,
        updating: false,
      });
    }
  }

  async onGetCurrentLocation({ latitude, longitude }) {
    await this.storage.getLocation(latitude, longitude);

    rAFTimeout(() => this.updatedState(this.storage.data), 600);
  }

  onGPSLocationClick() {
    if (!this.state.updating) {
      this.setState({ updating: true });

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.onGetCurrentLocation(position.coords);
        });
      }
    }
  }
  onRefreshClick() {
    const { latitude, longitude } = this.storage.data;

    if (!this.state.updating) {
      this.setState({ updating: true });

      this.onGetCurrentLocation({ latitude, longitude });
    }
  }

  onInfoClick() {
    this.setState({ showInfo: true });
  }

  onInfoClose() {
    this.setState({ showInfo: false });
  }

  componentDidMount() {
    this.init();
  }

  errorReachLimit() {
    return <Error/>
  }

  display() {
    return (this.state.error ? this.errorReachLimit() : this.displayHome());
  }

  displayHome() {
    return (
      <Fragment>
        <Home currentCondition={this.state.currentCondition}
          foreCastDaily={this.state.foreCastDaily}
          foreCastHourly={this.state.foreCastHourly}
          onInfoClick={this.onInfoClick}
          onGPSLocationClick={this.onGPSLocationClick}
          updating={this.state.updating}
          lastUpdate={this.state.lastUpdate}
          onRefreshClick={this.onRefreshClick} />
        <Info onInfoClose={this.onInfoClose} show={this.state.showInfo} />
      </Fragment>
    )
  }

  render() {
    return (
      <div className="App">
        {
          !this.state.dataLoaded ? <Loader ref={this.loader} /> : this.display()
        }
      </div>
    );
  }
}

export default App;
