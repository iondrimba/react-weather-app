class IpGeoLocation {
  constructor(apiSecret) {
    this.endpoint = ip => `http://api.ipstack.com/${ip}`;
    this.data = null;
    this.apiSecret = apiSecret;
  }

  async fetch(ip) {
    const params = {
      access_key: this.apiSecret,
    };

    try {
      const response = await fetch(this.addQueryParams(params, ip));
      const result = await response.json();

      this.data = result;
    } catch (error) {
      throw new Error(`IpGeoLocation unable to fetch: ${error.message}`);
    }
  }

  addQueryParams(params, ip) {
    let queryString = '';

    Object.entries(params).forEach(([key, value]) => {
      queryString += `${key}=${value}&`;
    });

    return `${this.endpoint(ip)}?${encodeURI(queryString)}`;
  }
}

export default IpGeoLocation;
