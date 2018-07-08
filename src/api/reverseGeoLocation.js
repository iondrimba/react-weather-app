class ReverseGeoLocation {
  constructor() {
    this.endpoint = (latitude, longitude) => `https://weather-api-nodejs.herokuapp.com/api/geolocation?latitude=${latitude}&longitude=${longitude}`;
    this.data = null;
  }

  async fetch(ip) {
    try {
      const response = await fetch(this.endpoint(ip));
      const result = await response.json();

      this.data = result;
    } catch (error) {
      throw new Error(`ReverseGeoLocation unable to fetch: ${error.message}`);
    }
  }
}

export default ReverseGeoLocation;
