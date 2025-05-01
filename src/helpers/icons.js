import wi_cloudy from '../svg/wi-cloudy.svg';
import wi_day_cloudy from '../svg/wi-day-cloudy.svg';
import wi_day_sunny from '../svg/wi-day-sunny.svg';
import wi_fog from '../svg/wi-fog.svg';
import wi_night_alt_cloudy from '../svg/wi-night-alt-cloudy.svg';
import wi_night_clear from '../svg/wi-night-clear.svg';
import wi_rain from '../svg/wi-rain.svg';
import wi_sleet from '../svg/wi-sleet.svg';
import wi_snow from '../svg/wi-snow.svg';
import wi_windy from '../svg/wi-windy.svg';

export const icons = {
  'wi-cloudy': wi_cloudy,
  'wi-day-cloudy': wi_day_cloudy,
  'wi-day-sunny': wi_day_sunny,
  'wi-fog': wi_fog,
  'wi-night-alt-cloudy': wi_night_alt_cloudy,
  'wi-night-clear': wi_night_clear,
  'wi-rain': wi_rain,
  'wi-sleet': wi_sleet,
  'wi-snow': wi_snow,
  'wi-windy': wi_windy,
};

export default (iconKey) => {
  const data = {
    1000: {
      id: 'wi-day-sunny'
    },
    1000: {
      id: 'wi-night-clear'
    },
    1003: {
      id: 'wi-day-cloudy'
    },
    1003: {
      id: 'wi-night-alt-cloudy'
    },
    1006: {
      id: 'wi-cloudy'
    },
    1006: {
      id: 'wi-cloudy'
    },
    1189: {
      id: 'wi-rain'
    },
    1207: {
      id: 'wi-sleet'
    },
    1219: {
      id: 'wi-snow'
    },
    1030: {
      id: 'wi-windy'
    },
    1135: {
      id: 'wi-fog'
    },
    1009: {
      id: 'wi-fog'
    },
  };

  const icon = data[iconKey];

  if (icon) {
    return icon;
  }

  throw  data[1006];
}
