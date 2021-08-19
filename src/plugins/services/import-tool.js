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
      const response = await axios.get(`/import/filetypes/${id}`)
      return response.data
    } catch (error) {
      return Promise.reject()
    }
  },
  async uploadFile(type, data) {
    try {
      const response = await axios.post(`/import/upload?file_schema_id=${type}&leave_extra_columns=false`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response
    } catch (error) {
      return Promise.reject()
    }
  },
  async mapColumns(importedFileId, data) {
    try {
      const response = await axios.post(`/import/map_columns/${importedFileId}`, data)
      return response.data
    } catch (error) {
      return Promise.reject()
    }
  },
}
