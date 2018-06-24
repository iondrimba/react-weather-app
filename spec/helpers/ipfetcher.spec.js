import IpFetcher from '../../src/helpers/ipfetcher';

describe('IpFetcher', () => {
  describe('constructor', () => {
    it('defines default props', () => {
      const result = new IpFetcher();

      expect(result.ip).toEqual('');
      expect(result.endpoint).toEqual('https://api.ipify.org/?format=json');
    });
  });

  describe('fetch', () => {
    it('sets ip after fetch', async () => {
      const ipFetcher = new IpFetcher();

      await ipFetcher.fetch();

      expect(ipFetcher.ip).not.toEqual('');
    });

    it('throws error', async () => {
      const ipFetcher = new IpFetcher();

      ipFetcher.endpoint = 'xpto';

      try {
        await ipFetcher.fetch();
      } catch (error) {
        expect(error).toEqual(new Error('Unable to fetch: Network request failed'));
      }
    });
  });
});
