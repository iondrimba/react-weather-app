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
      }, 500);
    });
  });

  describe('animate', () => {
    it('adds class animate-in to button.current', (done) => {
      const component = mount(<Info onInfoClick={() => { }} />);

      setTimeout(() => {
        expect(component.instance().button.current.className).toContain('animate-in');
        done();
      }, 900);
    });
  });
});
