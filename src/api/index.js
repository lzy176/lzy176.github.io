import axios from "axios";
import base from './base';
const api = {
  getGoodsList(){
    return axios.get(base.goodsList)
  }
}

export default api;
