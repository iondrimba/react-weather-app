import React from 'react';
import Location from '../../../src/components/Location';
import { enzymeConfig, mount } from '../../enzymeConfig';

enzymeConfig();

describe('Location', () => {
  it('matches snapshot', () => {
    const component = mount(<Location location='New York' />);

    expect(component).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    it('calls animate', (done) => {
      const component = mount(<Location location='New York'/>);
      const instance = component.instance();

      instance.animate = jest.fn();

      setTimeout(() => {
        expect(instance.animate).toBeCalled();
        done();
      }, 400);
    });
  });
});
