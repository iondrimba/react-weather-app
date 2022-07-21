import Storage from '../../src/app/storage';

jest.mock('../../src/api/ipGeoLocation');
jest.mock('../../src/api/foreCastAPI');
jest.mock('../../src/api/reverseGeoLocation');

describe('Storage', () => {
  describe('constructor', () => {
    it('defines properties', () => {
      const storage = new Storage();

      expect(storage.ipFetcher).toBeDefined();
      expect(storage.ipGeoLocation).toBeDefined();
      expect(storage.foreCastAPI).toBeDefined();
      expect(storage.reverseGeoLocation).toBeDefined();
      expect(storage.data).toBeDefined();
      expect(storage.currentDate).toBeDefined();
    });
  });

  describe('.update', () => {
    it('updates this.data', () => {
      const storage = new Storage();
      const initialData = storage.data;

      storage.update();

      expect(initialData).not.toEqual(storage.data);
    });

    it('calls .getLastUpdate', () => {
      const storage = new Storage();

      spyOn(storage, 'getLastUpdate');

      storage.update();

      expect(storage.getLastUpdate).toBeCalled();
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

  describe('async .getLocation', () => {
    describe('when last fetch exceeds one hour', () => {
      it('updates location', async () => {
        const storage = new Storage();

        localStorage.setItem('lastupdate', new Date(2018, 11, 24, 2, 5).toString());

        spyOn(storage.reverseGeoLocation, 'fetch').and.callThrough();
        spyOn(storage.foreCastAPI, 'fetch');
        spyOn(storage, 'update');

        await storage.getLocation(-23.5733, -46.6417);

        expect(storage.foreCastAPI.fetch).toBeCalledWith(-23.5733, -46.6417);
        expect(storage.reverseGeoLocation.fetch).toBeCalledWith(-23.5733, -46.6417);
        expect(storage.ipGeoLocation.data.city).toBe('Sundern');
        expect(storage.update).toBeCalled();
      });
    });

    describe('when last fetch still under and hour', () => {
      it('does not updates location and forecast', async () => {
        const storage = new Storage();

        localStorage.setItem('lastupdate', new Date().toString());

        spyOn(storage.reverseGeoLocation, 'fetch').and.callThrough();
        spyOn(storage.foreCastAPI, 'fetch').and.callThrough();
        spyOn(storage, 'update');

        await storage.getLocation(-23.5733, -46.6417);

        expect(storage.foreCastAPI.fetch).not.toBeCalledWith(-23.5733, -46.6417);
        expect(storage.reverseGeoLocation.fetch).not.toBeCalledWith(-23.5733, -46.6417);
        expect(storage.update).not.toBeCalled();
      });
    });
  });

  describe('.fetch', () => {
    it('calls through ._updateIP ._updateGeoLocation ._updateForecast .update', async () => {
      const storage = new Storage();

      spyOn(storage, '_updateIP');
      spyOn(storage, '_updateGeoLocation');
      spyOn(storage, '_updateForecast');
      spyOn(storage, 'update');

      await storage.fetch();

      expect(storage._updateIP).toBeCalled();
      expect(storage._updateGeoLocation).toBeCalled();
      expect(storage._updateForecast).toBeCalled();
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

  describe('._updateForecast', () => {
    describe('when forecast already cached', () => {
      it('does not fetch forecast', async () => {
        const storage = new Storage();

        localStorage.setItem('forecast', 1111);

        spyOn(storage.foreCastAPI, 'fetch');

        await storage._updateForecast();

        expect(storage.foreCastAPI.fetch).not.toBeCalled();
      });
    });

    describe('when forecast not present', () => {
      it('does fetch forecast', async () => {
        const storage = new Storage();

        localStorage.removeItem('forecast');

        spyOn(storage.foreCastAPI, 'fetch');

        await storage._updateForecast();

        expect(storage.foreCastAPI.fetch).toBeCalled();
      });
    });
  });
});
