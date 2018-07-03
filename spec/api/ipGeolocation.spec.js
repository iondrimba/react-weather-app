import IpGeoLocation from '../../src/api/ipGeoLocation';
import nock from 'nock';

const mockResult = {
  "city": "Brooklyn",
  "continent_code": "NA",
  "continent_name": "North America",
  "country_code": "US",
  "country_name": "United States",
  "ip": "161.185.160.93",
  "latitude": 40.7021,
  "location": {
    "calling_code": "1",
    "capital": "Washington D.C.",
    "country_flag": "http://assets.ipstack.com/flags/us.svg",
    "country_flag_emoji": "🇺🇸",
    "country_flag_emoji_unicode": "U+1F1FA U+1F1F8",
    "geoname_id": 5110302,
    "is_eu": false,
    "languages": [
      {
        "code": "en",
        "name": "English",
        "native": "English"
      }
    ]
  },
  "longitude": -73.9423,
  "region_code": "NY",
  "region_name": "New York",
  "type": "ipv4",
  "zip": "11206"
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

      expect(result.endpoint('111.111.1.11')).toEqual('https://weather-api-nodejs.herokuapp.com/api/ip?ip=111.111.1.11');
    });
  });

  describe('fetch', () => {
    it('returns geolocation based on ip address', async () => {
      const ipGeoLocation = new IpGeoLocation();

      nock('https://weather-api-nodejs.herokuapp.com')
        .get('/api/ip')
        .query({ ip: '161.185.160.93' })
        .reply(200, mockResult, { 'Access-Control-Allow-Origin': '*' });

      await ipGeoLocation.fetch('161.185.160.93');

      expect(ipGeoLocation.data).toEqual(mockResult);
    });

    it('throws error', async () => {
      const ipGeoLocation = new IpGeoLocation();

      try {
        await ipGeoLocation.fetch();
      } catch (error) {
        expect(error).toEqual(new Error('IpGeoLocation unable to fetch: Network request failed'));
      }
    });
  });
});
