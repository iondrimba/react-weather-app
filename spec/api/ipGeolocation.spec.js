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

const invalidAPIKeyResult = {
  "error": {
    "code": 101,
    "info": "You have not supplied a valid API Access Key. [Technical Support: support@apilayer.com]",
    "type": "invalid_access_key"
  },
  "success": false
};

const apiSecret = process.env.REACT_APP_IP_STACK;

describe('IpGeoLocation', () => {
  describe('constructor', () => {
    it('defines default props', () => {
      const api = new IpGeoLocation(apiSecret);

      expect(api.data).toEqual(null);
      expect(api.secret).toEqual(apiSecret);
    });
  });

  describe('endpoint', () => {
    it('returns endpoint with ip addres', () => {
      const result = new IpGeoLocation(apiSecret);

      expect(result.endpoint('111.111.1.11')).toEqual('http://api.ipstack.com/111.111.1.11');
    });
  });

  describe('fetch', () => {
    it('returns geolocation based on ip address', async () => {
      const ipGeoLocation = new IpGeoLocation(apiSecret);

      nock('http://api.ipstack.com')
        .get('/161.185.160.93')
        .query({ access_key: process.env.REACT_APP_IP_STACK })
        .reply(200, mockResult, { 'Access-Control-Allow-Origin': '*' });

      await ipGeoLocation.fetch('161.185.160.93');

      expect(ipGeoLocation.data).toEqual(mockResult);
    });

    it('returns invalid api key', async () => {
      const ipGeoLocation = new IpGeoLocation('152a7266a35fed3aaad8bf4ff449c363');

      nock('http://api.ipstack.com')
        .get('/161.185.160.93')
        .query({ access_key: ipGeoLocation.secret })
        .reply(200, invalidAPIKeyResult, { 'Access-Control-Allow-Origin': '*' });

      await ipGeoLocation.fetch('161.185.160.93');

      expect(ipGeoLocation.data).toEqual(invalidAPIKeyResult);
    });

    it('throws error', async () => {
      const ipGeoLocation = new IpGeoLocation(apiSecret);

      try {
        await ipGeoLocation.fetch();
      } catch (error) {
        expect(error).toEqual(new Error('IpGeoLocation unable to fetch: Network request failed'));
      }
    });
  });
});
