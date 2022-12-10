import axios from './api'

export default {
  getAll() {
    return axios
      .get('/users')
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
}