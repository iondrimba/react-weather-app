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
    describe('when last fetch still under and hour', () => {
      it('updates location', async () => {
        const storage = new Storage();

        localStorage.setItem('lastupdate', new Date().getTime());

        spyOn(storage.reverseGeoLocation, 'fetch').and.callThrough();
        spyOn(storage.foreCastAPI, 'fetch');
        spyOn(storage, 'update');

        await storage.getLocation(-23.5733, -46.6417);

        expect(storage.foreCastAPI.fetch).not.toBeCalledWith(-23.5733, -46.6417);
        expect(storage.reverseGeoLocation.fetch).toBeCalledWith(-23.5733, -46.6417);
        expect(storage.ipGeoLocation.data.city).toBe('Sundern');
        expect(storage.update).toBeCalled();
      });
    });

    describe('when last fetch still under and hour', () => {
      it('updates location and forecast', async () => {
        const storage = new Storage();

        localStorage.setItem('lastupdate', new Date(2018, 11, 24, 2, 5).getTime());

        spyOn(storage.reverseGeoLocation, 'fetch').and.callThrough();
        spyOn(storage.foreCastAPI, 'fetch').and.callThrough();
        spyOn(storage, 'update');

        await storage.getLocation(-23.5733, -46.6417);

        expect(storage.foreCastAPI.fetch).toBeCalledWith(-23.5733, -46.6417);
        expect(storage.reverseGeoLocation.fetch).toBeCalledWith(-23.5733, -46.6417);
        expect(storage.ipGeoLocation.data.city).toBe('Sundern');
        expect(storage.update).toBeCalled();
      });
    });
  });
});
