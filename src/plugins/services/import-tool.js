import axios from '@axios'

export default {
  async getCounties() {
    try {
      const response = await axios.get('/import/counties/')
      return response.data
    } catch (error) {
      return Promise.reject()
    }
  },
  async getFileTypes(id) {
    try {
      const response = await axios.get(`/import/typefiles/${id}`)
      return response.data
    } catch (error) {
      return Promise.reject()
    }
  },
  async uploadFile(type, data, options) {
    try {
      const response = await this.axios.post(`/import/upload?file_schema_id=${type}`, data, options)
      return response.data
    } catch (error) {
      return Promise.reject()
    }
  },
}
