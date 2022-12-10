import axios from './api'

export default {
  getAll() {
    return axios
      .get('/units')
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
}