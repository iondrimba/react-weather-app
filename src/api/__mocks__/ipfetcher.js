const fetch = jest.fn((url) => {
  return Promise.resolve({ "ip": "189.120.7.35" });
});
const mock = jest.fn().mockImplementation(() => {
  return { fetch: fetch };
});

export default mock;
