import ForecastAPI from '../../src/api/foreCastAPI';

const apiSecret = process.env.REACT_APP_IP_STACK;

describe('ForecastAPI', () => {
  describe('constructor', () => {
    it('defines default props', () => {
      const api = new ForecastAPI(apiSecret);

      expect(api.data).toEqual(null);
      expect(api.secret).toEqual(apiSecret);
    });
  });

  describe('endpoint', () => {
    it('returns endpoint with latitude and longitude', () => {
      const api = new ForecastAPI(apiSecret);

      expect(api.endpoint('40.7021', '-73.9423')).toEqual('https://weather-api-nodejs.herokuapp.com/api?latitude=40.7021&longitude=-73.9423');
    });
  });

  describe('fetch', () => {
    it('returns weather information based on latitude and longitude', async () => {
      const api = new ForecastAPI(apiSecret);

      await api.fetch('40.7021', '-73.9423');

      expect(api.data.timezone).toEqual('America/New_York');
    });

    it('returns invalid location based on latitude and longitude', async () => {
      const api = new ForecastAPI(apiSecret);

      await api.fetch('111', '111');

      expect(api.data).toEqual({ code: 400, error: 'The given location is invalid.' });
    });
  });
});
