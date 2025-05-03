import Storage from '../../src/app/storage';

jest.mock('../../src/api/ipGeoLocation');

describe('Storage', () => {
  describe('constructor', () => {
    it('defines properties', () => {
      const storage = new Storage();

      expect(storage.ipFetcher).toBeDefined();
      expect(storage.ipGeoLocation).toBeDefined();
      expect(storage.data).toBeDefined();
      expect(storage.currentDate).toBeDefined();
    });
  });

  describe('.getLastUpdate', () => {
    it('returns formatted date string', () => {
      const storage = new Storage();
      const result = storage.getLastUpdate(new Date(2018, 11, 24, 10, 33));

      expect(result).toBe('10:33');
    });

    it('returns formatted date string with leading zeros', () => {
      const storage = new Storage();
      const result = storage.getLastUpdate(new Date(2018, 11, 24, 2, 5));

      expect(result).toBe('02:05');
    });
  });

  describe('.fetch', () => {
    it('calls through ._updateIP ._updateGeoLocation ._updateForecast .update', async () => {
      const storage = new Storage();

      spyOn(storage, '_updateIP');
      spyOn(storage, '_updateGeoLocation');
      spyOn(storage, 'update');

      await storage.fetch();

      expect(storage._updateIP).toBeCalled();
      expect(storage._updateGeoLocation).toBeCalled();
      expect(storage.update).toBeCalled();
    });
  });

  describe('._updateIP', () => {
    describe('when IP already cached', () => {
      it('does not fetch IP', async () => {
        const storage = new Storage();

        localStorage.setItem('ip', 1111);

        spyOn(storage.ipFetcher, 'fetch');

        await storage._updateIP();

        expect(storage.ipFetcher.fetch).not.toBeCalled();
      });
    });

    describe('when IP not present', () => {
      it('does fetch IP', async () => {
        const storage = new Storage();

        localStorage.removeItem('ip');

        spyOn(storage.ipFetcher, 'fetch');

        await storage._updateIP();

        expect(storage.ipFetcher.fetch).toBeCalled();
      });
    });
  });

  describe('._updateGeoLocation', () => {
    describe('when geoLocation already cached', () => {
      it('does not fetch geoLocation', async () => {
        const storage = new Storage();

        localStorage.setItem('geoLocation', 1111);

        spyOn(storage.ipGeoLocation, 'fetch');

        await storage._updateGeoLocation();

        expect(storage.ipGeoLocation.fetch).not.toBeCalled();
      });
    });

    describe('when geoLocation not present', () => {
      it('does fetch geoLocation', async () => {
        const storage = new Storage();

        localStorage.removeItem('geoLocation');

        spyOn(storage.ipGeoLocation, 'fetch');

        await storage._updateGeoLocation();

        expect(storage.ipGeoLocation.fetch).toBeCalled();
      });
    });
  });
});
