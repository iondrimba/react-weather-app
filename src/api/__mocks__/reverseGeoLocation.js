import data from '../../mock/reverseGeoLocation';

const fetch = jest.fn(() => Promise.resolve({...data}));
const mock = jest.fn().mockImplementation(() => ({ fetch: fetch, data: data }));

export default mock;
