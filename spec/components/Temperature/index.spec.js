import React from 'react';
import Temperature from '../../../src/components/Temperature';
import { enzymeConfig, mount } from '../../enzymeConfig';

enzymeConfig();

describe('Temperature', () => {
  it('matches snapshot', () => {
    const component = mount(<Temperature weather='clear' temperature={10} />);

    expect(component).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    it('calls animate', (done) => {
      const component = mount(<Temperature weather='clear' temperature={10} />);
      const instance = component.instance();

      instance.animate = jest.fn();

      setTimeout(() => {
        expect(instance.animate).toBeCalled();
        done();
      }, 500);
    });
  });
});
