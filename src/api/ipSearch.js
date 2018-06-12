import data from '../mock/ipSearch.json';

class IpSearch {
  constructor() {
    this.endpoint = 'http://dataservice.accuweather.com/locations/v1/cities/ipaddress';
    this.data = null;
  }

  async fetchLocation(ip) {
    const params = {
      apikey: process.env.REACT_APP_API_CODE,
      q: ip,
      details: true
    };

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

    return `${this.endpoint}?${encodeURI(queryString)}`;
  }
}

export default IpSearch;
