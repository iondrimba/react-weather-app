import IpFetcher from '../../src/api/ipfetcher';
import nock from 'nock';

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

      nock('https://api.ipify.org')
        .get('/')
        .query({ format: 'json' })
        .reply(200, {
          ip: '128.128.1.1',
        }, { 'Access-Control-Allow-Origin': '*' });

      await ipFetcher.fetch();

      expect(ipFetcher.ip).not.toEqual('');
    });

    it('throws error', async () => {
      const ipFetcher = new IpFetcher();

      ipFetcher.endpoint = 'xpto';

      try {
        await ipFetcher.fetch();
      } catch (error) {
        expect(error).toEqual(new Error('IpFetcher unable to fetch: Network request failed'));
      }
    });
  });
});
