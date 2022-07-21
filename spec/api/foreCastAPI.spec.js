import ForecastAPI from '../../src/api/foreCastAPI';
import nock from 'nock';

describe('ForecastAPI', () => {
  describe('constructor', () => {
    it('defines default props', () => {
      const api = new ForecastAPI();

      expect(api.data).toEqual(null);
      expect(api.secret).toEqual();
    });
  });

  describe('endpoint', () => {
    it('returns endpoint with latitude and longitude', () => {
      const api = new ForecastAPI();

      expect(api.endpoint('40.7021', '-73.9423')).toEqual('http://localhost:5000/api?latitude=40.7021&longitude=-73.9423');
    });
  });

  describe('fetch', () => {
    it('returns weather information based on latitude and longitude', async () => {
      const api = new ForecastAPI();

      nock('http://localhost:5000')
        .get('/api')
        .query({ latitude: '40.7021', longitude: '-73.9423' })
        .reply(200, {
          timezone: 'America/New_York',
        }, { 'Access-Control-Allow-Origin': '*' });

      await api.fetch('40.7021', '-73.9423');

      expect(api.data.timezone).toEqual('America/New_York');
    });

    it('returns invalid location based on latitude and longitude', async () => {
      const api = new ForecastAPI();

      nock('http://localhost:5000')
        .get('/api')
        .query({ latitude: '111', longitude: '111' })
        .reply(200, { code: 400, error: 'The given location is invalid.' }, { 'Access-Control-Allow-Origin': '*' });


      await api.fetch('111', '111');

      expect(api.data).toEqual({ code: 400, error: 'The given location is invalid.' });
    });

    it('throws error', async () => {
      const api = new ForecastAPI();

      nock('http://localhost:5000')
        .get('/api')
        .query({ latitude: '111', longitude: '111' })
        .reply(200, { code: 400, error: 'The given location is invalid.' }, { 'Access-Control-Allow-Origin': '*' });

        try {
        await api.fetch('111', '111');
      } catch (error) {
        expect(error).toEqual(new Error('ForeCastAPI unable to fetch: Network request failed'));
      }
    });
  });
});
