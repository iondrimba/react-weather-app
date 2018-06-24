import React from 'react';
import DateCurrent from '../../../src/components/DateCurrent';
import { enzymeConfig, mount } from '../../enzymeConfig';

enzymeConfig();

describe('DateCurrent', () => {
  it('matches snapshot', () => {
    const component = mount(<DateCurrent />);

    expect(component).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    it('calls animate', (done) => {
      const component = mount(<DateCurrent />);
      const instance = component.instance();

      instance.animate = jest.fn();

      setTimeout(() => {
        expect(instance.animate).toBeCalled();
        done();
      }, 400);
    });
  })
});
