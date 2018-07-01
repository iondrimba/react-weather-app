import React from 'react';
import RainProbability from '../../../src/components/RainProbability';
import { enzymeConfig, mount } from '../../enzymeConfig';

enzymeConfig();

describe('RainProbability', () => {
  it('matches snapshot', () => {
    const component = mount(<RainProbability probability={20}/>);

    expect(component).toMatchSnapshot();
  });
});
