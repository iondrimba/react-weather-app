import React from 'react';
import Info from '../../../src/app/Info';
import { enzymeConfig, mount } from '../../enzymeConfig';

enzymeConfig();

describe('Info', () => {
  it('matches snapshot', () => {
    const component = mount(<Info onInfoClick={() => { }} onInfoClose={() => { }} show={true} />);

    expect(component).toMatchSnapshot();
  });

  describe('onInfoClose', () => {
    it('class props.onInfoClose', (done) => {
      const onInfoClose = jest.fn();
      const component = mount(<Info onInfoClick={() => { }} onInfoClose={onInfoClose} show={true} />);
      const instance = component.instance();

      spyOn(instance.close.current, 'hide');

      instance.onInfoClose();

      setTimeout(() => {
        expect(onInfoClose).toHaveBeenCalled();
        done();
      }, 150);
    });

    it('calls close.current.hide', (done) => {
      const component = mount(<Info onInfoClick={() => { }} onInfoClose={() => { }} show={true} />);
      const instance = component.instance();

      spyOn(instance.close.current, 'hide');

      instance.onInfoClose();

      setTimeout(() => {
        expect(instance.close.current.hide).toHaveBeenCalled();
        done();
      }, 200);
    });

    it('removes class animate-in from view.current', () => {
      const component = mount(<Info onInfoClick={() => { }} onInfoClose={() => { }} show={true} />);
      const instance = component.instance();

      instance.render(instance.props);

      instance.onInfoClose();

      expect(instance.view.current.className).not.toContain('animate-in');
    });

    it('removes class animate-in from transition.current', () => {
      const component = mount(<Info onInfoClick={() => { }} onInfoClose={() => { }} show={true} />);
      const instance = component.instance();

      instance.render(instance.props);

      instance.onInfoClose();

      expect(instance.transition.current.className).not.toContain('animate-in');
    });
  });
});
