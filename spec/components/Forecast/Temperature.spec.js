import React from 'react';
import Temperature from '../../../src/components/Forecast/Temperature';
import { enzymeConfig, mount } from '../../enzymeConfig';

enzymeConfig();

describe('Temperature', () => {
  it('matches snapshot', () => {
    const component = mount(<Temperature temperature={22} />);

    expect(component).toMatchSnapshot();
  });
});
