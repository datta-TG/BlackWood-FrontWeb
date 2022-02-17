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
}
