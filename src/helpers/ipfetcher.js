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
      console.log(error.message);
    }
  }
}

export default IpFetcher;
