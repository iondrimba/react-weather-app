import React from 'react';
import Info from '../../../src/components/Info';
import { enzymeConfig, mount } from '../../enzymeConfig';

enzymeConfig();

describe('Info', () => {
  it('matches snapshot', () => {
    const component = mount(<Info onInfoClick={() => { }} />);

    expect(component).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    it('calls animate', (done) => {
      spyOn(Info.prototype, 'animate');

      mount(<Info onInfoClick={() => { }} />);

      setTimeout(() => {
        expect(Info.prototype.animate).toBeCalled();
        done();
      }, 360);
    });
  });
});
