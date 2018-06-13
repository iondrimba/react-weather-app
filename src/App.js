import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import IpFetcher from './helpers/ipfetcher';
import IpSearch from './api/ipSearch';
import CurrentCondition from './api/currentCondition';
import ForeCast from './api/foreCast';

class App extends Component {
  constructor() {
    super();

    this.ipFetcher = new IpFetcher();
    this.ipSearch = new IpSearch();
    this.currentCondition = new CurrentCondition();
    this.foreCast = new ForeCast();

    this.state = {
      currentCondition: {
        location: 'São Paulo',
        temperature: 23.2,
        weather: 'Clear',
        dayTime: false,
        humidity: 30,
        wind: {
          speed: 10,
          direction: 'N'
        },
        uv: 'Low'
      },
      foreCastDaily: [
        {
          weekDay: 'mon',
          rainProbability: 47,
          temperature: {
            max: 23,
            min: 12
          }
        },
        {
          weekDay: 'tue',
          rainProbability: 35,
          temperature: {
            max: 33,
            min: 14
          }
        },
        {
          weekDay: 'wed',
          rainProbability: 1,
          temperature: {
            max: 22,
            min: 21
          }
        },
        {
          weekDay: 'Thu',
          rainProbability: 10,
          temperature: {
            max: 30,
            min: 25
          }
        },
        {
          weekDay: 'Fry',
          rainProbability: 20,
          temperature: {
            max: 19,
            min: 11
          }
        }
      ],
      foreCastHourly: [
        {
          time: 8,
          rainProbability: 20,
          temperature: 23
        },
        {
          time: 9,
          rainProbability: 22,
          temperature: 25
        },
        {
          time: 10,
          rainProbability: 40,
          temperature: 15
        },
        {
          time: 11,
          rainProbability: 15,
          temperature: 16
        },
        {
          time: 12,
          rainProbability: 5,
          temperature: 24
        }
      ]
    };

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
          <span>{this.state.currentCondition.location}</span>
          <span>{this.state.currentCondition.temperature}</span>
          <span>{this.state.currentCondition.weather}</span>
          <span>{this.state.currentCondition.humidity}</span>
          <span>{this.state.currentCondition.wind.speed}</span>
          <span>{this.state.currentCondition.wind.direction}</span>
          <span>{this.state.currentCondition.wind.uv}</span>
        </section>
        <section className="forecast-daily">
          {
            this.state.foreCastDaily.map((item) => {
              return <div className="forecast-daily__item">
                <span>{item.weekDay}</span>
                <span>{item.rainProbability}</span>
                <span>{item.temperature.max}</span>
                <span>{item.temperature.min}</span>
              </div>
            })
          }
        </section>

        <section className="forecast-hourly">
          {
            this.state.foreCastHourly.map((item) => {
              return <div className="forecast-hourly__item">
                <span>{item.time}</span>
                <span>{item.rainProbability}</span>
                <span>{item.temperature}</span>
              </div>
            })
          }
        </section>
      </div>
    );
  }
}

export default App;
