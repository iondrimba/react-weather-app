import ReverseGeoLocation from '../../src/api/reverseGeoLocation';
import nock from 'nock';

const apiSecret = process.env.REACT_APP_IP_STACK;

describe('ReverseGeoLocation', () => {
  describe('constructor', () => {
    it('defines default props', () => {
      const api = new ReverseGeoLocation();

      expect(api.data).toEqual(null);
    });
  });

  describe('endpoint', () => {
    it('returns endpoint with latitude and longitude', () => {
      const api = new ReverseGeoLocation(apiSecret);

      expect(api.endpoint('40.7021', '-73.9423')).toEqual('https://weather-api-nodejs.herokuapp.com/api/geolocation?latitude=40.7021&longitude=-73.9423');
    });
  });

  describe('fetch', () => {
    it('returns weather information based on latitude and longitude', async () => {
      const api = new ReverseGeoLocation(apiSecret);

      nock('https://weather-api-nodejs.herokuapp.com')
        .get('/api/geolocation')
        .query({ latitude: '40.7021', longitude: '-73.9423' })
        .reply(200, {
          timezone: 'America/New_York',
        }, { 'Access-Control-Allow-Origin': '*' });

      await api.fetch('40.7021', '-73.9423');

      expect(api.data.timezone).toEqual('America/New_York');
    });

    it('returns invalid location based on latitude and longitude', async () => {
      const api = new ReverseGeoLocation(apiSecret);

      nock('https://weather-api-nodejs.herokuapp.com')
        .get('/api/geolocation')
        .query({ latitude: '111', longitude: '111' })
        .reply(200, { code: 400, error: 'The given location is invalid.' }, { 'Access-Control-Allow-Origin': '*' });


      await api.fetch('111', '111');

      expect(api.data).toEqual({ code: 400, error: 'The given location is invalid.' });
    });
  });
});
