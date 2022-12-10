import axios from './api'

export default {
  getAll() {
    return axios
      .get('/assets')
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
}