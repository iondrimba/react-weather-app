class IpGeoLocation {
  constructor(secret) {
    this.endpoint = ip => `${process.env.REACT_APP_API_ENDPOINT}?ip=${ip}`;
    this.data = null;
    this.secret = secret;
  }

  async fetch(ip) {
    try {
      const response = await fetch(this.endpoint(ip));
      const result = await response.json();

      this.data = result;
    } catch (error) {
      throw new Error(`IpGeoLocation unable to fetch: ${error.message}`);
    }
  }
}

export default IpGeoLocation;
