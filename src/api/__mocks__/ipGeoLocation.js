import data from '../../mock/foreCast.json';

const fetch = jest.fn((ip) => {
  return Promise.resolve({...data});
});
const mock = jest.fn().mockImplementation(() => {
  return { fetch: fetch, data: data };
});

export default mock;
