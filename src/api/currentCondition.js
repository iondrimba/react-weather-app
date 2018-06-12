import data from '../mock/currentCondition.json';

class CurrentCondition {
  constructor() {
    this.endpoint = locationKey => `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`;
    this.data = null;
  }

  async fetch(locationKey) {
    const params = {
      apikey: process.env.REACT_APP_API_CODE,
      details: true
    };

    this.locationKey = locationKey;

    try {
      // const response = await fetch(this.addQueryParams(params));
      // const result = await response.json();
      this.data = data;

    } catch (error) {
      console.log(error.message);
    }
  }

  addQueryParams(params) {
    let queryString = '';

    Object.entries(params).forEach(([key, value]) => {
      queryString += `${key}=${value}&`;
    });

    return `${this.endpoint(this.locationKey)}?${encodeURI(queryString)}`;
  }
}

export default CurrentCondition;
