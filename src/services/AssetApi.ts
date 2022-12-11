import axios from './api'

export default {
  getAll() {
    return axios
      .get('/assets')
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  getAssetById(asset: any) {
    const { assetId } = asset
    return axios
      .get(`/assets/?assetId=${assetId}`)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  getAssetByUnitId(asset: any) {
    const { unitId } = asset
    return axios
      .get(`/assets/?unitId=${unitId}`)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
}