import data from '../../mock/foreCast.json';

const fetch = jest.fn((latitude, longitude) => {
  return Promise.resolve({...data});
});

const mock = jest.fn().mockImplementation(() => {
  return { fetch: fetch, data: data };
});

export default mock;
