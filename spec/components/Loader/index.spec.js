import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import Loader from '../../../src/components/Loader';

Enzyme.configure({ adapter: new Adapter() });

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
  })
});
