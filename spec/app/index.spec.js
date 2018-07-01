import React from 'react';
import App from '../../src/app';
import { enzymeConfig, mount } from '../enzymeConfig';

jest.mock('../../src/api/ipfetcher');
jest.mock('../../src/api/ipGeoLocation');
jest.mock('../../src/api/foreCastAPI');
jest.mock('../../src/helpers/drag');

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
});
