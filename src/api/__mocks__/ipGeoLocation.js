const data = {
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

const fetch = jest.fn((ip) => {
  return Promise.resolve({...data});
});
const mock = jest.fn().mockImplementation(() => {
  return { fetch: fetch, data: data };
});

export default mock;
