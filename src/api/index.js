import axios from "axios";
import base from './base';
const mapUseKey = 'ee9c1800214b96c7adf69a8ec932e8d0';
const api = {
  getGoodsList() {
    return axios.get(base.goodsList)
  },
  getMapIp() {
    const url = `${base.map}ip?key=${mapUseKey}`;
    return axios.get(url)
  },
  getWeather(city) {
    const url = `${base.map}weather/weatherInfo?key=${mapUseKey}&city=${city}&extensions=all`;
    return axios.get(url)
  }
}

export default api;
