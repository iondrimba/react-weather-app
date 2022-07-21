import ipRegex from 'ip-regex';

class IpFetcher {
  constructor() {
    this.ip = '';
    this.endpoint = 'https://api.ipify.org/?format=json';
  }

  async fetch() {
    try {
      const response = await fetch(this.endpoint);
      const result = await response.json();
      this.ip = result.ip;
    } catch (error) {
      throw new Error(`IpFetcher unable to fetch: ${error.message}`);
    }
  }

  isValid() {
    return ipRegex().test(this.ip);
  }
}

export default IpFetcher;
