import React from 'react';
import Forecast from '../../../src/components/Forecast';
import { enzymeConfig, mount } from '../../enzymeConfig';

enzymeConfig();

const ForecastComponent = (<Forecast id='11' title='some title' icon='wi-cloudy' animationDelay={1} > <h1>Children</h1> </Forecast>);

describe('Forecast', () => {
  it('matches snapshot', () => {
    const component = mount(ForecastComponent);

    expect(component).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    it('calls animate', (done) => {
      const component = mount(ForecastComponent);
      const instance = component.instance();

      instance.animate = jest.fn();

      setTimeout(() => {
        expect(instance.animate).toBeCalled();
        done();
      }, 200);
    });
  });

  describe('.icon', () => {
    it('matches source icon path wi-cloudy', () => {
      const component = mount(ForecastComponent);

      component.debug();

      expect(component.find('[src="wi-cloudy"]').length).toEqual(1);
    });
  });
});
