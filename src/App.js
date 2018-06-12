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

    this.init();
  }

  async init() {
    await this.ipFetcher.fetch();
    await this.ipSearch.fetchLocation(this.ipFetcher.ip);
    await this.currentCondition.fetch(this.ipSearch.data.Key);
    await this.foreCast.fetch5Days(this.ipSearch.data.Key);
    await this.foreCast.fetch12hours(this.ipSearch.data.Key);

    console.log(this.foreCast);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
