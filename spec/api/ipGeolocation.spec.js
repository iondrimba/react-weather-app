import IpGeoLocation from '../../src/api/ipGeoLocation';
import nock from 'nock';

const mockResult = {
  "data": {
    "geo": {
      "city": "Brooklyn",
      "continent_code": "NA",
      "continent_name": "North America",
      "country_code": "US",
      "country_name": "United States",
      "ip": "161.185.160.93",
      "latitude": 40.7021,
      "longitude": -73.9423,
      "region_code": "NY",
      "region_name": "New York",
      "type": "ipv4",
      "zip": "11206"
    }
  }
};

describe('IpGeoLocation', () => {
  describe('constructor', () => {
    it('defines default props', () => {
      const api = new IpGeoLocation();

      expect(api.data).toEqual(null);
    });
  });

  describe('endpoint', () => {
    it('returns endpoint with ip addres', () => {
      const result = new IpGeoLocation();

      expect(result.endpoint('111.111.1.11')).toEqual('http://localhost:5000/api?ip=111.111.1.11');
    });
  });

  describe('fetch', () => {
    it('returns geolocation based on ip address', async () => {
      const ipGeoLocation = new IpGeoLocation();

      nock('http://localhost:5000')
        .get('/api')
        .query({ ip: '161.185.160.93' })
        .reply(200, mockResult, { 'Access-Control-Allow-Origin': '*' });

      await ipGeoLocation.fetch('161.185.160.93');

      expect(ipGeoLocation.data.data.geo).toEqual(mockResult.data.geo);
    });

    it('throws error', async () => {
      const ipGeoLocation = new IpGeoLocation();

      nock('http://localhost:5000')
        .get('/api')
        .query({ ip: 'undefined' })
        .reply(200, mockResult, { 'Access-Control-Allow-Origin': '*' });

      try {
        await ipGeoLocation.fetch();
      } catch (error) {
        expect(error).toEqual(new Error('IpGeoLocation unable to fetch: Network request failed'));
      }
    });
  });
});
