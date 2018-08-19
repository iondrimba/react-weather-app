import React from 'react';
import Refresh from '../../../src/components/Refresh';
import { enzymeConfig, mount } from '../../enzymeConfig';

enzymeConfig();

describe('Refresh', () => {
  it('matches snapshot', () => {
    const component = mount(<Refresh time='12:00' onClick={() => { }} />);

    expect(component).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    it('calls animate, getClass', (done) => {
      const component = mount(<Refresh time='12:00' onClick={() => { }} />);
      const instance = component.instance();

      instance.animate = jest.fn();

      setTimeout(() => {
        expect(instance.animate).toBeCalled();
        done();
      }, 500);
    });
  });

  describe('render', () => {
    it('calls getClass', (done) => {
      const component = mount(<Refresh time='12:00' onClick={() => { }} />);
      const instance = component.instance();

      spyOn(instance, 'getClass');

      instance.render();

      setTimeout(() => {
        expect(instance.getClass).toBeCalled();
        done();
      }, 500);
    });
  });

  describe('getClass', () => {
    it('return classes without fetching style', () => {
      const component = mount(<Refresh time='12:00' updating={false} onClick={() => { }} />);
      const instance = component.instance();

      const result = instance.getClass(instance.props);

      expect(result).not.toContain('fetching');
    });

    it('return classes with fetching style', () => {
      const component = mount(<Refresh time='12:00' updating={true} onClick={() => { }} />);
      const instance = component.instance();

      const result = instance.getClass(instance.props);

      expect(result).toContain('fetching');
    });
  });

  describe('onMouseDown', () => {
    it('triggers mousedown', () => {
      spyOn(Refresh.prototype, 'onMouseDown');

      const component = mount(<Refresh time='12:00' updating={false} onClick={() => { }} />);

      component.find('.button-refresh').simulate('mousedown');

      expect(Refresh.prototype.onMouseDown).toBeCalled();
    });

    it('adds class press to button', (done) => {
      const component = mount(<Refresh time='12:00' updating={false} onClick={() => { }} />);
      const instance = component.instance();

      component.find('.button-refresh').simulate('mousedown');

      setTimeout(() => {
        expect(instance.button.current.className).toContain('press');
        done();
      }, 100);
    });
  });

  describe('onMouseUp', () => {
    it('triggers onMouseUp', () => {
      spyOn(Refresh.prototype, 'onMouseUp');

      const component = mount(<Refresh time='12:00' updating={false} onClick={() => { }} />);

      component.find('.button-refresh').simulate('mouseup');

      expect(Refresh.prototype.onMouseUp).toBeCalled();
    });

    it('removes class press from button', (done) => {
      const component = mount(<Refresh time='12:00' updating={false} onClick={() => { }} />);
      const instance = component.instance();

      component.find('.button-refresh').simulate('mousedown');
      component.find('.button-refresh').simulate('mouseup');

      setTimeout(() => {
        expect(instance.button.current.className).not.toContain('press');
        done();
      }, 100);
    });
  });

  describe('onTouchStart', () => {
    it('triggers onMouseDown', () => {
      spyOn(Refresh.prototype, 'onMouseDown');

      const component = mount(<Refresh time='12:00' updating={false} onClick={() => { }} />);

      component.find('.button-refresh').simulate('touchstart');

      expect(Refresh.prototype.onMouseDown).toBeCalled();
    });
  });

  describe('onTouchEnd', () => {
    it('triggers onMouseUp', () => {
      spyOn(Refresh.prototype, 'onMouseUp');

      const component = mount(<Refresh time='12:00' updating={false} onClick={() => { }} />);

      component.find('.button-refresh').simulate('touchend');

      expect(Refresh.prototype.onMouseUp).toBeCalled();
    });
  });
});
