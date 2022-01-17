import axios from '@axios'

const ERROR_500 = 'Internal Server Error'

// Endpoints
export default {
  async importMaster() {
    try {
      const response = await axios.get('/import_tool/property_master/import_master')
      return { data: response.data, status: response.status }
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.detail)
      }
      return Promise.reject(ERROR_500)
    }
  },
}
