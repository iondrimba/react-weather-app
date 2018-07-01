import React from 'react';
import Home from '../../src/app/Home';
import { enzymeConfig, mount } from '../enzymeConfig';

jest.mock('../../src/helpers/drag');

enzymeConfig();

const currentCondition = {
  "currentCondition": {
    "location": "Rio",
    "temperature": 23,
    "date": "--",
    "weather": "Clear",
    "dayTime": false,
    "humidity": 30,
    "dataLoaded": false
  },
  "foreCastDaily": [
    {
      "weekDay": "mon",
      "rainProbability": 47,
      "icon": "wi-day-sunny",
      "temperature": {
        "max": 23,
        "min": 12
      }
    },
    {
      "weekDay": "tue",
      "rainProbability": 35,
      "icon": "wi-day-sunny",
      "temperature": {
        "max": 33,
        "min": 14
      }
    },
    {
      "weekDay": "wed",
      "rainProbability": 1,
      "icon": "wi-day-sunny",
      "temperature": {
        "max": 22,
        "min": 21
      }
    },
    {
      "weekDay": "Thu",
      "rainProbability": 10,
      "icon": "wi-day-sunny",
      "temperature": {
        "max": 30,
        "min": 25
      }
    },
    {
      "weekDay": "Fry",
      "rainProbability": 20,
      "icon": "wi-fog",
      "temperature": {
        "max": 19,
        "min": 11
      }
    }
  ],
  "foreCastHourly": [
    {
      "time": 8,
      "rainProbability": 20,
      "temperature": 23,
      "icon": "wi-fog"
    },
    {
      "time": 9,
      "rainProbability": 22,
      "temperature": 25,
      "icon": "wi-day-sunny"
    },
    {
      "time": 10,
      "rainProbability": 40,
      "temperature": 15,
      "icon": "wi-day-sunny"
    },
    {
      "time": 11,
      "rainProbability": 15,
      "temperature": 16,
      "icon": "wi-day-sunny"
    },
    {
      "time": 12,
      "rainProbability": 5,
      "temperature": 24,
      "icon": "wi-day-sunny"
    }
  ],
  "location": "São Paulo",
  "date": "Monday, June 25, 2018",
  "temperature": 20,
  "weather": "Clear"
};

const foreCastDaily = [
  {
    "weekDay": "tue",
    "rainProbability": 0,
    "icon": "wi-night-alt-cloudy",
    "temperature": {
      "max": 26,
      "min": 16
    }
  },
  {
    "weekDay": "wed",
    "rainProbability": 13,
    "icon": "wi-day-cloudy",
    "temperature": {
      "max": 26,
      "min": 15
    }
  },
  {
    "weekDay": "thu",
    "rainProbability": 0,
    "icon": "wi-day-cloudy",
    "temperature": {
      "max": 26,
      "min": 15
    }
  },
  {
    "weekDay": "fry",
    "rainProbability": 3,
    "icon": "wi-day-sunny",
    "temperature": {
      "max": 26,
      "min": 15
    }
  },
  {
    "weekDay": "sat",
    "rainProbability": 4,
    "icon": "wi-night-alt-cloudy",
    "temperature": {
      "max": 26,
      "min": 14
    }
  }
]

const foreCastHourly = [
  {
    "time": 22,
    "rainProbability": 0,
    "temperature": 21,
    "icon": "wi-night-clear"
  },
  {
    "time": 23,
    "rainProbability": 0,
    "temperature": 20,
    "icon": "wi-night-clear"
  },
  {
    "time": "00",
    "rainProbability": 0,
    "temperature": 19,
    "icon": "wi-night-clear"
  },
  {
    "time": "01",
    "rainProbability": 0,
    "temperature": 19,
    "icon": "wi-night-clear"
  },
  {
    "time": "02",
    "rainProbability": 0,
    "temperature": 18,
    "icon": "wi-night-clear"
  }
]

describe('Home', () => {
  it('matches snapshot', () => {
    const component = mount(<Home currentCondition={currentCondition} foreCastHourly={foreCastHourly} foreCastDaily={foreCastDaily} />);

    expect(component).toMatchSnapshot();
  });
});
