import React from 'react';
import Temperature from '../../../src/components/Temperature';
import { enzymeConfig, mount } from '../../enzymeConfig';

enzymeConfig();

describe('Temperature', () => {
  it('matches snapshot', () => {
    const component = mount(<Temperature />);

    expect(component).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    it('calls animate', (done) => {
      const component = mount(<Temperature />);
      const instance = component.instance();

      instance.animate = jest.fn();

      setTimeout(() => {
        expect(instance.animate).toBeCalled();
        done();
      }, 500);
    });
  });
});
