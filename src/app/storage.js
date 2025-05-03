import IpGeoLocation from '../api/ipGeoLocation';
import IpFetcher from '../api/ipfetcher';
import timeConvert, { addLeadingZero } from '../helpers/time';
import icons from '../helpers/icons';
import weekdays from '../helpers/weekdays';
import initialState from '../initialState';

export default class Storage {
  constructor() {
    this.ipFetcher = new IpFetcher();
    this.ipGeoLocation = new IpGeoLocation();
    this.data = { ...initialState };
    this.currentDate = new Date();
  }

  update() {
    if (!this.ipGeoLocation.data.error) {
      const nextHours = this.ipGeoLocation.data.forecast.forecastday[0].hour
        .filter(item => (item.time_epoch > this.currentDate.getTime() / 1000));

      this.data = {
        latitude: this.ipGeoLocation.data.location.lat,
        longitude: this.ipGeoLocation.data.location.lon,
        lastUpdate: this.getLastUpdate(this.currentDate),
        currentCondition: {
          location: this.ipGeoLocation.data.location.name,
          date: timeConvert(this.ipGeoLocation.data.location.localtime_epoch).localeDateString,
          temperature: Math.round(this.ipGeoLocation.data.current.temp_c),
          weather: this.ipGeoLocation.data.current.condition.text,
        },
        foreCastHourly: nextHours.slice(0, 6).map((item) => ({
          time: timeConvert(item.time_epoch).hours,
          rainProbability: item.chance_of_rain,
          temperature: Math.floor(item.temp_c),
          icon: item.is_day
            ? `svg/day/${icons(item.condition.code)}.png`	
            : `svg/night/${icons(item.condition.code)}.png`,
        })),
        foreCastDaily: this.ipGeoLocation.data.forecast.forecastday.slice(1, 6).map(item => ({
          weekDay: weekdays(timeConvert(item.date_epoch).weekDay),
          rainProbability: item.day.daily_chance_of_rain,
          icon: item.day.is_day
          ? `svg/day/${icons(item.day.condition.code)}.png`	
          : `svg/night/${icons(item.day.condition.code)}.png`,
          temperature: {
            max: Math.round(item.day.maxtemp_c),
            min: Math.round(item.day.mintemp_c)
          }
        }))
      }
    }
  }

  getLastUpdate(currentDate) {
    return `${addLeadingZero(currentDate.getHours())}:${addLeadingZero(currentDate.getMinutes())}`;
  }

  async _updateIP() {
    if (localStorage.getItem('ip')) {
      this.ipFetcher.ip = localStorage.getItem('ip');
    } else {
      await this.ipFetcher.fetch();

      if (this.ipFetcher.isValid()) {
        localStorage.setItem('ip', this.ipFetcher.ip);
      }
    }
  }

  async _updateGeoLocation() {
    if (localStorage.getItem('geoLocation')) {
      this.ipGeoLocation.data = JSON.parse(localStorage.getItem('geoLocation'));
    } else {
      await this.ipGeoLocation.fetch(this.ipFetcher.ip);

      if (this.ipGeoLocation.data.location.name) {
        localStorage.setItem('geoLocation', JSON.stringify(this.ipGeoLocation.data));
      }
    }
  }

  async fetch() {
    if (this.updateCache()) {
      localStorage.clear();
    }
    await this._updateIP();
    await this._updateGeoLocation();

    this.update();
  }

  updateCache() {
    this.currentDate = new Date();
    const prevDate = localStorage.getItem('lastupdate');
    const ms = this.currentDate - new Date(prevDate);
    const min = Math.floor((ms / 1000 / 60) << 0);
    const sec = Math.floor((ms / 1000) % 60);

    return (min > 58 && sec > 0);
  }

  async getLocation() {
    this.data.lastUpdate = this.getLastUpdate(this.currentDate);

    if (this.updateCache()) {
      localStorage.clear();
      localStorage.setItem('lastupdate', this.currentDate.toString());

      await this._updateIP();
      await this._updateGeoLocation();

      this.update();
    }
  }
}
