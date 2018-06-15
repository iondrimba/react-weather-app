import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import IpFetcher from './helpers/ipfetcher';
import IpSearch from './api/ipSearch';
import CurrentCondition from './api/currentCondition';
import ForeCast from './api/foreCast';
import initialState from './initialState';

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
        <section className="current-condition">
          <div className="location">
            <span className="location__icon">
              <svg enable-background="new 0 0 24 24" height="24px" id="Layer_1" version="1.1" viewBox="0 0 24 24" width="24px">
                <path d="M11.513,12.38c-2.117,0-3.835-1.729-3.835-3.862c0-2.135,1.718-3.863,3.835-3.863s3.835,1.729,3.835,3.863  C15.348,10.65,13.63,12.38,11.513,12.38 M11.513,0C6.825,0,3.025,3.827,3.025,8.549c0,4.46,3.844,10.213,6.411,13.014  c0.959,1.045,2.076,2.454,2.076,2.454s1.2-1.417,2.229-2.493C16.306,18.84,20,13.451,20,8.549C20,3.827,16.2,0,11.513,0"/>
              </svg>
            </span>
            <span className="location__text">{this.state.currentCondition.location}</span>
          </div>
          <div className="wrapper-temperature">
          <span>{this.state.currentCondition.weather}</span>
            <div className="temperature">
              <span className="temperature__value">{this.state.currentCondition.temperature}</span>
              <div className="temperature__unit">
                <span className="temperature__unit-dot"></span>
                <span className="temperature__unit-letter">c</span>
              </div>
            </div>
            <div className="current-condition__details">
            <div className="wind">
             <div>
              <div className="wind__speed">
                <span className="wind__speed-icon">
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                      viewBox="0 0 30 30" Style="enable-background:new 0 0 30 30;">
                    <path d="M3.1,16.97c0,0.24,0.09,0.45,0.28,0.62c0.16,0.19,0.37,0.28,0.63,0.28H18.7c0.29,0,0.53,0.1,0.73,0.3
                      c0.2,0.2,0.3,0.45,0.3,0.74c0,0.29-0.1,0.53-0.3,0.72c-0.2,0.19-0.44,0.29-0.74,0.29c-0.29,0-0.54-0.1-0.73-0.29
                      c-0.16-0.18-0.36-0.26-0.6-0.26c-0.25,0-0.46,0.09-0.64,0.26s-0.27,0.38-0.27,0.61c0,0.25,0.09,0.46,0.28,0.63
                      c0.56,0.55,1.22,0.83,1.96,0.83c0.78,0,1.45-0.27,2.01-0.81c0.56-0.54,0.83-1.19,0.83-1.97s-0.28-1.44-0.84-2
                      c-0.56-0.56-1.23-0.84-2-0.84H4.01c-0.25,0-0.46,0.09-0.64,0.26C3.19,16.51,3.1,16.72,3.1,16.97z M3.1,13.69
                      c0,0.23,0.09,0.43,0.28,0.61c0.17,0.18,0.38,0.26,0.63,0.26h20.04c0.78,0,1.45-0.27,2.01-0.82c0.56-0.54,0.84-1.2,0.84-1.97
                      c0-0.77-0.28-1.44-0.84-1.99s-1.23-0.83-2.01-0.83c-0.77,0-1.42,0.27-1.95,0.8c-0.18,0.16-0.27,0.38-0.27,0.67
                      c0,0.26,0.09,0.47,0.26,0.63c0.17,0.16,0.38,0.24,0.63,0.24c0.24,0,0.45-0.08,0.63-0.24c0.19-0.21,0.42-0.31,0.7-0.31
                      c0.29,0,0.53,0.1,0.73,0.3c0.2,0.2,0.3,0.44,0.3,0.73c0,0.29-0.1,0.53-0.3,0.72c-0.2,0.19-0.44,0.29-0.73,0.29H4.01
                      c-0.25,0-0.46,0.09-0.64,0.26C3.19,13.23,3.1,13.44,3.1,13.69z"/>
                    </svg>
                </span>
                <span className="wind__speed-value">{this.state.currentCondition.wind.speed}</span>
              </div>
              <div className="wind__direction">
                <span className="wind__direction-icon">
                  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 30 30" Style="enable-background:new 0 0 30 30;">
                  <path d="M3.74,14.5c0-2.04,0.51-3.93,1.52-5.66s2.38-3.1,4.11-4.11s3.61-1.51,5.64-1.51c1.52,0,2.98,0.3,4.37,0.89
                    s2.58,1.4,3.59,2.4s1.81,2.2,2.4,3.6s0.89,2.85,0.89,4.39c0,1.52-0.3,2.98-0.89,4.37s-1.4,2.59-2.4,3.59s-2.2,1.8-3.59,2.39
                    s-2.84,0.89-4.37,0.89c-1.53,0-3-0.3-4.39-0.89s-2.59-1.4-3.6-2.4s-1.8-2.2-2.4-3.58S3.74,16.03,3.74,14.5z M6.22,14.5
                    c0,2.37,0.86,4.43,2.59,6.18c1.73,1.73,3.79,2.59,6.2,2.59c1.58,0,3.05-0.39,4.39-1.18s2.42-1.85,3.21-3.2s1.19-2.81,1.19-4.39
                    s-0.4-3.05-1.19-4.4s-1.86-2.42-3.21-3.21s-2.81-1.18-4.39-1.18s-3.05,0.39-4.39,1.18S8.2,8.75,7.4,10.1S6.22,12.92,6.22,14.5z
                    M11.11,20.35l3.75-13.11c0.01-0.1,0.06-0.15,0.15-0.15s0.14,0.05,0.15,0.15l3.74,13.11c0.04,0.11,0.03,0.19-0.02,0.25
                    s-0.13,0.06-0.24,0l-3.47-1.3c-0.1-0.04-0.2-0.04-0.29,0l-3.5,1.3c-0.1,0.06-0.17,0.06-0.21,0S11.09,20.45,11.11,20.35z"/>
                  </svg>
                </span>
                <span className="wind__direction-value">{this.state.currentCondition.wind.direction}</span>
              </div>
              </div>
            </div>
            <div className="uv">
              <span className="uv__label">uv</span>
              <span className="uv__value">{this.state.currentCondition.uv.indice}</span>
            </div>
            </div>
              </div>
        </section>
        <section className="forecasts">
        <section className="forecast-hourly">
          {
            this.state.foreCastHourly.map((item) => {
              return <div className="forecast-hourly__item">
                <span className="forecast-hourly__item-hour">{`${item.time}:00`}</span>
                <img alt="icon" src={`svg/${item.icon}.svg`}/>
                <p className="forecast-hourly__item-temperature">{item.temperature}
                  <span className="temperature__unit-dot"></span>
                </p>
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
        </section>


      </div>
    );
  }
}

export default App;
