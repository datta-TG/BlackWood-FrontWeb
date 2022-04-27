import axios from '@axios'

const ERROR_500 = 'Internal Server Error'

// Endpoints

export default {
  async getSchemas() {
    try {
      const response = await axios.get('/property_stack/schemas')
      return response.data
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.detail)
      }
      return Promise.reject(ERROR_500)
    }
  },
  async index(pagination) {
    try {
      const response = await axios.post('/property_stack/index', pagination)
      return { data: response.data, status: response.status }
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.detail)
      }
      return Promise.reject(ERROR_500)
    }
  },
  async getSavedFilters() {
    try {
      const response = await axios.get('/property_stack/filters')
      return { data: response.data, status: response.status }
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.detail)
      }
      return Promise.reject(ERROR_500)
    }
  },
  async saveFilter(filter) {
    try {
      const response = await axios.post('/property_stack/filters/add', filter)
      return { data: response.data, status: response.status }
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.detail)
      }
      return Promise.reject(ERROR_500)
    }
  },
  async removeFilter(filter) {
    try {
      const response = await axios.post('/property_stack/filters/remove', filter)
      return { data: response.data, status: response.status }
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.detail)
      }
      return Promise.reject(ERROR_500)
    }
  },
}
