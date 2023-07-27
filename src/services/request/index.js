import axios from 'axios'
import {BASE_URL, TIMEOUT} from './config'
class KRequest {
  constructor(baseURL, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  get(config) {
    return this.request({...config, method: "GET"})
  }
  post(config) {
    return this.request({...config, method: "POST"})
  }

}

export default new KRequest(BASE_URL, TIMEOUT)