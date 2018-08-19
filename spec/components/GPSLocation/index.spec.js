import React from 'react';
import GPSLocation from '../../../src/components/GPSLocation';
import { enzymeConfig, mount } from '../../enzymeConfig';

enzymeConfig();

describe('GPSLocation', () => {
  it('matches snapshot', () => {
    const component = mount(<GPSLocation onGPSLocationClick={() => { }} />);

    expect(component).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    it('calls animate, getClass', (done) => {
      const component = mount(<GPSLocation onGPSLocationClick={() => { }} />);
      const instance = component.instance();

      instance.animate = jest.fn();

      setTimeout(() => {
        expect(instance.animate).toBeCalled();
        done();
      }, 500);
    });
  });

  describe('onMouseDown', () => {
    it('triggers mousedown', () => {
      spyOn(GPSLocation.prototype, 'onMouseDown');

      const component = mount(<GPSLocation updating={false} onGPSLocationClick={() => { }} />);

      component.find('.gps-location').simulate('mousedown');

      expect(GPSLocation.prototype.onMouseDown).toBeCalled();
    });

    it('adds class press to button', (done) => {
      const component = mount(<GPSLocation updating={false} onGPSLocationClick={() => { }} />);
      const instance = component.instance();

      component.find('.gps-location').simulate('mousedown');

      setTimeout(() => {
        expect(instance.button.current.className).toContain('press');
        done();
      }, 100);
    });
  });

  describe('onMouseUp', () => {
    it('triggers onMouseUp', () => {
      spyOn(GPSLocation.prototype, 'onMouseUp');

      const component = mount(<GPSLocation updating={false} onGPSLocationClick={() => { }} />);

      component.find('.gps-location').simulate('mouseup');

      expect(GPSLocation.prototype.onMouseUp).toBeCalled();
    });

    it('removes class press from button', (done) => {
      const component = mount(<GPSLocation updating={false} onGPSLocationClick={() => { }} />);
      const instance = component.instance();

      component.find('.gps-location').simulate('mousedown');
      component.find('.gps-location').simulate('mouseup');

      setTimeout(() => {
        expect(instance.button.current.className).not.toContain('press');
        done();
      }, 100);
    });
  });

  describe('onTouchStart', () => {
    it('triggers onMouseDown', () => {
      spyOn(GPSLocation.prototype, 'onMouseDown');

      const component = mount(<GPSLocation updating={false} onGPSLocationClick={() => { }} />);

      component.find('.gps-location').simulate('touchstart');

      expect(GPSLocation.prototype.onMouseDown).toBeCalled();
    });
  });

  describe('onTouchEnd', () => {
    it('triggers onMouseUp', () => {
      spyOn(GPSLocation.prototype, 'onMouseUp');

      const component = mount(<GPSLocation updating={false} onGPSLocationClick={() => { }} />);

      component.find('.gps-location').simulate('touchend');

      expect(GPSLocation.prototype.onMouseUp).toBeCalled();
    });
  });
});
