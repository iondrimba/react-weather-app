import IpGeoLocation from '../api/ipGeoLocation';
import ForeCastAPI from '../api/foreCastAPI';
import ReverseGeoLocation from '../api/reverseGeoLocation';
import IpFetcher from '../api/ipfetcher';
import timeConvert, { addLeadingZero } from '../helpers/time';
import icons from '../helpers/icons';
import weekdays from '../helpers/weekdays';
import initialState from '../initialState';

export default class Storage {
  constructor() {
    this.ipFetcher = new IpFetcher();
    this.ipGeoLocation = new IpGeoLocation();
    this.foreCastAPI = new ForeCastAPI(process.env.REACT_APP_DARK_SKY_API_CODE);
    this.reverseGeoLocation = new ReverseGeoLocation();
    this.data = { ...initialState };
    this.currentDate = new Date();
  }

  update() {
    if (!this.ipGeoLocation.data.error) {
      this.data = {
        latitude: this.foreCastAPI.data.latitude,
        longitude: this.foreCastAPI.data.longitude,
        lastUpdate: this.getLastUpdate(this.currentDate),
        currentCondition: {
          ...initialState,
          location: this.ipGeoLocation.data.city,
          date: timeConvert(this.foreCastAPI.data.currently.time).localeDateString,
          temperature: Math.round(this.foreCastAPI.data.currently.temperature),
          weather: this.foreCastAPI.data.currently.summary
        },
        foreCastHourly: this.foreCastAPI.data.hourly.data.slice(0, 5).map((item) => ({
          time: timeConvert(item.time).hours,
          rainProbability: Math.round(item.precipProbability * 100),
          temperature: Math.round(item.temperature),
          icon: icons(item.icon).id
        })),
        foreCastDaily: this.foreCastAPI.data.daily.data.slice(1, 6).map(item => ({
          weekDay: weekdays(timeConvert(item.time).weekDay),
          rainProbability: Math.round(item.precipProbability * 100),
          icon: icons(item.icon).id,
          temperature: {
            max: Math.round(item.temperatureMax),
            min: Math.round(item.temperatureMin)
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

      if (this.ipGeoLocation.data.city) {
        localStorage.setItem('geoLocation', JSON.stringify(this.ipGeoLocation.data));
      }
    }
  }

  async _updateForecast() {
    if (localStorage.getItem('forecast')) {
      this.foreCastAPI.data = JSON.parse(localStorage.getItem('forecast'));
    } else {
      await this.foreCastAPI.fetch(this.ipGeoLocation.data.latitude, this.ipGeoLocation.data.longitude);

      if (this.foreCastAPI.data.timezone) {
        localStorage.setItem('lastupdate', new Date().toString());
        localStorage.setItem('forecast', JSON.stringify(this.foreCastAPI.data));
      }
    }
  }

  async fetch() {
    if (this.updateCache()) {
      localStorage.clear();
    }
    await this._updateIP();
    await this._updateGeoLocation();
    await this._updateForecast();

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

  async getLocation(latitude, longitude) {
    this.foreCastAPI.data.latitude = latitude;
    this.foreCastAPI.data.longitude = longitude;
    this.data.lastUpdate = this.getLastUpdate(this.currentDate);

    if (this.updateCache()) {
      localStorage.clear();

      await this.reverseGeoLocation.fetch(latitude, longitude);
      await this.foreCastAPI.fetch(latitude, longitude);

      localStorage.setItem('lastupdate', this.currentDate.toString());
      localStorage.setItem('forecast', JSON.stringify(this.foreCastAPI.data));

      this.ipGeoLocation.data.city = this.reverseGeoLocation.data[0].city || this.reverseGeoLocation.data[0].state;

      this.update();
    }
  }
}
