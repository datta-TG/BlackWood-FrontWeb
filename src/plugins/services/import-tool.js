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
      const response = await axios.post(`/upload_file/upload?file_schema_id=${type}&leave_extra_columns=false`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response
    } catch (error) {
      return Promise.reject()
    }
  },
  async viewFile(id, pagination) {
    try {
      const response = await axios.get(`/import/view_file/${id}`, pagination)
      return response.data
    } catch (error) {
      return Promise.reject()
    }
  },
  async mapColumns(importedFileId, data) {
    try {
      const response = await axios.post(`/upload_file/map_columns/${importedFileId}`, data)
      return response.data
    } catch (error) {
      return Promise.reject()
    }
  },
  async commitUpload(importedFileId, data) {
    try {
      const response = await axios.post(`/upload_file/commit_upload/${importedFileId}`, data)
      return response.data
    } catch (error) {
      return Promise.reject()
    }
  },
  async abortUpload(importedFileId, data) {
    try {
      const response = await axios.post(`/upload_file/abort_upload/${importedFileId}`, data)
      return response.data
    } catch (error) {
      return Promise.reject()
    }
  },
}
