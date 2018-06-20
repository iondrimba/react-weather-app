class ForeCastAPI {
  constructor() {
    this.secret = process.env.REACT_APP_DARK_SKY_API_CODE;
    this.endpoint = (latitude, longitude) => `https://api.darksky.net/forecast/${this.secret}/${latitude},${longitude}`;
    this.data = null;
  }

  async fetch(latitude, longitude) {
    try {
      const response = await fetch(this.endpoint(latitude, longitude), {
        mode: 'no-cors'
      });
      const result = await response.json();

    } catch (error) {
      console.log(error.message);
    }
  }
}

export default ForeCastAPI;
