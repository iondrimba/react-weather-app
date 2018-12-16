import React from 'react';
import App from '../../src/app';
import { enzymeConfig, mount, shallow } from '../enzymeConfig';

jest.mock('../../src/api/ipfetcher');
jest.mock('../../src/api/ipGeoLocation');
jest.mock('../../src/api/foreCastAPI');

enzymeConfig();

describe('App', () => {
  it('matches snapshot', () => {
    const component = mount(<App />);

    expect(component).toMatchSnapshot();
  });

  it('calls setState on dataLoaded to true', (done) => {
    const component = mount(<App />);
    setTimeout(() => {
      expect(component.instance().state.dataLoaded).toEqual(true);
      done();
    }, 2000);
  });

  describe('constructor', () => {
    it('defines properties', () => {
      const component = mount(<App />);
      const instance = component.instance();

      expect(instance.loader).toBeDefined();
      expect(instance.onInfoClick).toBeDefined();
      expect(instance.onInfoClose).toBeDefined();
      expect(instance.onRefreshClick).toBeDefined();
      expect(instance.onGPSLocationClick).toBeDefined();
      expect(instance.storage).toBeDefined();
      expect(instance.state).toBeDefined();
    });
  });

  describe('.init', () => {
    it('fetches data and updates state', async (done) => {
      const component = mount(<App />);
      const instance = component.instance();

      spyOn(instance.storage, 'fetch');
      spyOn(instance, 'updatedState');

      await instance.init();

      expect(instance.storage.fetch).toBeCalled();

      setTimeout(() => {
        expect(instance.updatedState).toBeCalled();
        done();
      }, 1800);
    });
  });

  describe('.updatedState', () => {
    it('calls .setState', () => {
      const component = mount(<App />);
      const instance = component.instance();
      const data = { mock: 'xpto' };

      spyOn(instance, 'setState');

      instance.updatedState(data);

      expect(instance.setState).toBeCalledWith({
        ...data,
        showInfo: false,
        dataLoaded: true,
        updating: false,
      });
    });
  });

  describe('.onGetCurrentLocation', () => {
    it('fetches data and updates state', async (done) => {
      const component = mount(<App />);
      const instance = component.instance();
      const data = { latitude: 1111, longitude: 2222 };

      spyOn(instance.storage, 'getLocation');
      spyOn(instance, 'updatedState');

      await instance.onGetCurrentLocation(data);

      expect(instance.storage.getLocation).toBeCalledWith(1111, 2222);

      setTimeout(() => {
        component.unmount();
        expect(instance.updatedState).toBeCalledWith(instance.storage.data);
        done();
      }, 700);
    });
  });

  describe('.onGPSLocationClick', () => {
    describe('when app state is not updating', () => {
      it('calls onGetCurrentLocation', () => {
        const component = mount(<App />);
        const instance = component.instance();

        navigator.geolocation = {
          getCurrentPosition: (callback) => { callback({ coords: 1111 }) },
        };

        spyOn(navigator.geolocation, 'getCurrentPosition').and.callThrough();
        spyOn(instance, 'onGetCurrentLocation');

        instance.onGPSLocationClick();

        expect(navigator.geolocation.getCurrentPosition).toBeCalled();
        expect(instance.onGetCurrentLocation).toBeCalled();
      });
    });

    describe('when app state is updating', () => {
      it('does not call onGetCurrentLocation', () => {
        const component = mount(<App />);
        const instance = component.instance();

        component.state().updating = true;

        spyOn(instance, 'onGetCurrentLocation');

        instance.onGPSLocationClick();

        expect(instance.onGetCurrentLocation).not.toBeCalled();
      });
    });
  });

  describe('.onRefreshClick', () => {
    describe('when app state is not updating', () => {
      it('calls onGetCurrentLocation', () => {
        const component = mount(<App />);
        const instance = component.instance();

        spyOn(instance, 'onGetCurrentLocation');

        instance.onRefreshClick();

        expect(instance.onGetCurrentLocation).toBeCalled();
      });
    });

    describe('when app state is updating', () => {
      it('does not call onGetCurrentLocation', () => {
        const component = mount(<App />);
        const instance = component.instance();

        component.state().updating = true;

        spyOn(instance, 'onGetCurrentLocation');

        instance.onRefreshClick();

        expect(instance.onGetCurrentLocation).not.toBeCalled();
      });
    });
  });

  describe('.onInfoClick', () => {
    it('calls setState', () => {
      const component = mount(<App />);
      const instance = component.instance();

      spyOn(instance, 'setState');

      instance.onInfoClick();

      expect(instance.setState).toBeCalledWith({ showInfo: true });
    });
  });

  describe('.onInfoClose', () => {
    it('calls setState', () => {
      const component = mount(<App />);
      const instance = component.instance();

      spyOn(instance, 'setState');

      instance.onInfoClose();

      expect(instance.setState).toBeCalledWith({ showInfo: false });
    });
  });
});
