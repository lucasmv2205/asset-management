import axios from './api'

export default {
  getAll() {
    return axios
      .get('/units')
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  delete(id: string) {
    return axios
      .delete(`/units/${id}`)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  edit(unit: any) {
    return axios
      .patch(`/units/${unit.id}`, unit)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  create(unit: any) {
    return axios
      .post(`/units/`, unit)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
}