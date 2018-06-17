import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import IpFetcher from './helpers/ipfetcher';
import IpSearch from './api/ipSearch';
import CurrentCondition from './api/currentCondition';
import ForeCast from './api/foreCast';
import initialState from './initialState';
import Location from './components/Location';
import Temperature from './components/Temperature';
import Navigation from './components/Navigation';
import RainProbality from './components/RainProbality';

class App extends Component {
  constructor() {
    super();

    this.ipFetcher = new IpFetcher();
    this.ipSearch = new IpSearch();
    this.currentCondition = new CurrentCondition();
    this.foreCast = new ForeCast();

    this.state = { ...initialState };

    this.init();
  }

  async init() {
    await this.ipFetcher.fetch();
    await this.ipSearch.fetchLocation(this.ipFetcher.ip);
    await this.currentCondition.fetch(this.ipSearch.data.Key);
    await this.foreCast.fetch5Days(this.ipSearch.data.Key);
    await this.foreCast.fetch12hours(this.ipSearch.data.Key);
  }

  render() {
    return (
      <div className="App">
        <Location location={this.state.currentCondition.location} />
        <Temperature weather={this.state.currentCondition.weather} temperature={this.state.currentCondition.temperature}/>

        <section className="forecasts">
          <Navigation />

          <div className="forecasts__scroll-panel">
            <section className="forecast-hourly">
              {
                this.state.foreCastHourly.map((item) => {
                  return <div className="forecast-hourly__item">
                    <span className="forecast-hourly__item-hour">{`${item.time}:00`}</span>
                    <img alt="icon" src={`svg/${item.icon}.svg`}/>
                    <p className="forecast-hourly__item-temperature">{item.temperature}
                      <span className="temperature__unit-dot"></span>
                    </p>
                    <RainProbality probability={item.rainProbability} />
                  </div>
                })
              }
            </section>

            <section className="forecast-daily">
              {
                this.state.foreCastDaily.map((item) => {
                  return <div className="forecast-daily__item">
                    <span className="forecast-daily__item-weekday">{item.weekDay}</span>
                    <img alt="icon" src={`svg/${item.icon}.svg`}/>
                    <div className="forecast-daily__temperatures">
                      <p className="forecast-daily__item-temperature">{item.temperature.max}
                        <span className="temperature__unit-dot"></span>
                      </p>
                      <p className="forecast-daily__item-temperature">{item.temperature.min}
                        <span className="temperature__unit-dot"></span>
                      </p>
                    </div>
                    <div className="rain">
                      <span className="rain__icon">
                      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                          viewBox="0 0 30 30" Style="enable-background:new 0 0 30 30;" >
                        <path d="M9.81,15.25c0,0.92,0.23,1.78,0.7,2.57s1.1,1.43,1.9,1.9c0.8,0.47,1.66,0.71,2.59,0.71c0.93,0,1.8-0.24,2.61-0.71
                          c0.81-0.47,1.45-1.11,1.92-1.9c0.47-0.8,0.71-1.65,0.71-2.57c0-0.6-0.17-1.31-0.52-2.14c-0.35-0.83-0.77-1.6-1.26-2.3
                          c-0.44-0.57-0.96-1.2-1.56-1.88c-0.6-0.68-1.65-1.73-1.89-1.97l-1.28,1.29c-0.62,0.6-1.22,1.29-1.79,2.08
                          c-0.57,0.79-1.07,1.64-1.49,2.55C10.01,13.79,9.81,14.58,9.81,15.25z"/>
                        </svg>
                      </span>
                      <span className="rain__probability">{`${item.rainProbability}%`}</span>
                    </div>
                  </div>
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
