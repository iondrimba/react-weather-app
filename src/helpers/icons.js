export default (iconKey) => {
  const data = {
    'clear-day': {
      id: 'wi-day-sunny'
    },
    'clear-night': {
      id: 'wi-night-clear'
    },
    'partly-cloudy-day': {
      id: 'wi-day-cloudy'
    },
    'partly-cloudy-night': {
      id: 'wi-night-alt-cloudy'
    },
    cloudy: {
      id: 'wi-cloudy'
    },
    rain: {
      id: 'wi-rain'
    },
    sleet: {
      id: 'wi-sleet'
    },
    snow: {
      id: 'wi-snow'
    },
    wind: {
      id: 'wi-windy'
    },
    fog: {
      id: 'wi-fog'
    },
  };

  const icon = data[iconKey];

  if (icon) {
    return icon;
  }

  throw new Error(`No icon registered with the key: ${iconKey}`);
}
