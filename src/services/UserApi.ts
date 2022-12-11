import axios from './api'

export default {
  getAll() {
    return axios
      .get('/users')
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  delete(id: string) {
    return axios
      .delete(`/users/${id}`)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
}