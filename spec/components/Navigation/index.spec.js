import React from 'react';
import Navigation from '../../../src/components/Navigation';
import { enzymeConfig, mount } from '../../enzymeConfig';

enzymeConfig();

describe('Navigation', () => {
  it('matches snapshot with currentForecast hourly', () => {
    const component = mount(<Navigation currentForecast='hourly'/>);

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot with currentForecast daily', () => {
    const component = mount(<Navigation currentForecast='daily'/>);

    expect(component).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    it('matches count of rays', () => {
      const component = mount(<Navigation currentForecast='hourly'/>);
      const instance = component.instance();

      expect(instance.dots.length).toEqual(2);
    });

    it('calls animate', (done) => {
      const component = mount(<Navigation currentForecast='hourly'/>);
      const instance = component.instance();

      instance.animate = jest.fn();

      setTimeout(() => {
        expect(instance.animate).toBeCalled();
        done();
      }, 400);
    });
  });

  describe('animate', () => {
    it('adds classes animate-in to dots', (done) => {
      const component = mount(<Navigation currentForecast='hourly' />);
      const instance = component.instance();

      instance.animate();

      setTimeout(() => {
        instance.dots.map( element => expect(element.classList).toContain('animate-in'));
        done();
      }, 1000);
    });
  });
});
