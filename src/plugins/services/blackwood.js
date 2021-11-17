import axios from '@axios'

// Endpoints
export default {
  async startDatabase() {
    try {
      const response = await axios.post('https://3aw9ku75w7.execute-api.us-east-1.amazonaws.com/startrds')
      return { data: response.data, status: response.status }
    } catch (error) {
      return Promise.reject()
    }
  },
  async stopDatabase() {
    try {
      const response = await axios.post('https://3aw9ku75w7.execute-api.us-east-1.amazonaws.com/stoprds')
      return { data: response.data, status: response.status }
    } catch (error) {
      return Promise.reject()
    }
  },
}
