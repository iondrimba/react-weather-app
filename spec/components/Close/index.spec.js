import React from 'react';
import Close from '../../../src/components/Close';
import { enzymeConfig, mount } from '../../enzymeConfig';

enzymeConfig();

describe('Close', () => {
  it('matches snapshot', () => {
    const component = mount(<Close onCloseClick={() => { }} />);

    expect(component).toMatchSnapshot();
  });

  describe('animate', () => {
    it('adds class animate-in to button', (done) => {
      const component = mount(<Close onCloseClick={() => { }} />);

      component.instance().animate();

      setTimeout(() => {
        expect(component.instance().button.current.className).toContain('animate-in');
        done();
      }, 100);
    });
  });

  describe('hide', () => {
    it('removes class animate-in from button', (done) => {
      const component = mount(<Close onCloseClick={() => { }} />);

      component.instance().hide();

      setTimeout(() => {
        expect(component.instance().button.current.className).not.toContain('animate-in');
        done();
      }, 100);
    });
  });
});
