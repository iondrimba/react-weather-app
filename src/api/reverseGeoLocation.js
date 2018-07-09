class ReverseGeoLocation {
  constructor() {
    this.endpoint = (latitude, longitude) => `https://weather-api-nodejs.herokuapp.com/api/geolocation?latitude=${latitude}&longitude=${longitude}`;
    this.data = null;
  }

  async fetch(latitude, longitude) {
    try {
      const response = await fetch(this.endpoint(latitude, longitude));
      const result = await response.json();

      this.data = result;
    } catch (error) {
      throw new Error(`ReverseGeoLocation unable to fetch: ${error.message}`);
    }
  }
}

export default ReverseGeoLocation;
