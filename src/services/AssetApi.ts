import axios from './api'

export default {
  getAll() {
    return axios
      .get('/assets')
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  delete(id: string) {
    return axios
      .delete(`/assets/${id}`)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  
}