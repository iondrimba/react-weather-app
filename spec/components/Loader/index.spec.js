import React from 'react';
import Loader from '../../../src/components/Loader';
import { enzymeConfig, mount } from '../../enzymeConfig';

enzymeConfig();

describe('Loader', () => {
  it('matches snapshot', () => {
    const component = mount(<Loader />);

    expect(component).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    it('matches count of rays', () => {
      const component = mount(<Loader />);
      const instance = component.instance();

      expect(instance.rays.length).toEqual(8);
    });
  })

  describe('animateIn', () => {
    it('calls animateCircle, animateRays, startRotation', (done) => {
      const component = mount(<Loader />);
      const instance = component.instance();

      instance.animateCircle = jest.fn();
      instance.animateRays = jest.fn();
      instance.startRotation = jest.fn();

      instance.animateIn();

      expect(instance.animateCircle).toBeCalled();

      setTimeout(() => {
        expect(instance.animateRays).toBeCalled();
        expect(instance.startRotation).toBeCalled();
        done();
      }, 800);
    });
  });

  describe('animateRays', () => {
    it('adds classes animate-in to ray', (done) => {
      const component = mount(<Loader />);
      const instance = component.instance();

      instance.animateRays();

      setTimeout(() => {
        instance.rays.map( element => expect(element.classList).toContain('animate-in'));
        done();
      }, 1000);
    });
  });

  describe('startRotation', () => {
    it('adds class startRotation to circle', (done) => {
      const component = mount(<Loader />);
      const instance = component.instance();

      instance.startRotation();

      setTimeout(() => {
        expect(instance.circle.current.classList).toContain('start-rotation');
        done();
      }, 350);
    });
  });

  describe('animateOut', () => {
    it('removes class animate-in from rays', (done) => {
      const component = mount(<Loader />);
      const instance = component.instance();

      instance.animateOut();

      setTimeout(() => {
        instance.rays.map( element => expect(element.classList).not.toContain('animate-in'));
        done();
      }, 1000);
    });
  });
});
