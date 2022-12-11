import axios from './api'

export default {
  getAll() {
    return axios
      .get('/companies')
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  delete(id: string) {
    return axios
      .delete(`/companies/${id}`)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  edit(company: any) {
    return axios
      .patch(`/companies/${company.id}`, company)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  create(company: any) {
    return axios
      .post(`/companies/`, company)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
}