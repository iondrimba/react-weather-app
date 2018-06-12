import dailyMock from '../mock/foreCastDaily.json';
import hourlyMock from '../mock/foreCastHourly.json';

class ForeCast {
  constructor() {
    this.endpoint = (locationKey, range) => `http://dataservice.accuweather.com/forecasts/v1/${range}/${locationKey}`;
    this.data = null;
    this.ranges = {
      DAILY: 'daily/5day',
      HOURLY: 'hourly/12hour'
    };
  }

  async fetch5Days(locationKey) {
    await this.fetch(locationKey, this.ranges.DAILY);

    this[this.ranges.DAILY] = dailyMock;
  }

  async fetch12hours(locationKey) {
    await this.fetch(locationKey, this.ranges.HOURLY);

    this[this.ranges.HOURLY] = hourlyMock;
  }

  async fetch(locationKey, range) {
    const params = {
      apikey: process.env.REACT_APP_API_CODE,
      details: true,
      metric: true
    };

    this.locationKey = locationKey;

    try {
      const response = await fetch(this.addQueryParams(this.endpoint(this.locationKey, range), params));
      const result = await response.json();
      this[range] = result;

    } catch (error) {
      console.log(error.message);
    }
  }


  addQueryParams(endpoint, params) {
    let queryString = '';

    Object.entries(params).forEach(([key, value]) => {
      queryString += `${key}=${value}&`;
    });

    return `${endpoint}?${encodeURI(queryString)}`;
  }
}

export default ForeCast;
