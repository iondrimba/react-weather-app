const fetch = jest.fn(() => Promise.resolve({ "ip": "189.120.7.35" }));
const mock = jest.fn().mockImplementation(() => ({ fetch: fetch }));

export default mock;
