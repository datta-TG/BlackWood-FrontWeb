import axios from '@axios'

export default {
  async getCounties() {
    try {
      const response = await axios.get('/import/counties')
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
  async getTags() {
    try {
      const response = await axios.get('view_file/get_tags')
      return { data: response.data, status: response.status }
    } catch (error) {
      return Promise.reject()
    }
  },
  async getAllFileTypes() {
    try {
      const response = await axios.get('/import/filetypes')
      return response.data
    } catch (error) {
      return Promise.reject()
    }
  },
  async uploadFile(type, data) {
    try {
      const response = await axios.post(`/upload_file/upload?file_schema_id=${type}`, data, {
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
      const response = await axios.post(`/import/view_file/${id}`, pagination)
      return { data: response.data, status: response.status }
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
  async commitUpload(importedFileId) {
    try {
      const response = await axios.post(`/upload_file/commit_upload/${importedFileId}`)
      return response.data
    } catch (error) {
      return Promise.reject()
    }
  },
  async abortUpload(importedFileId) {
    try {
      const response = await axios.delete(`/upload_file/abort_upload/${importedFileId}`)
      return response.data
    } catch (error) {
      return Promise.reject()
    }
  },

  // imported files

  async viewImportedFiles(pagination) {
    try {
      const response = await axios.post('/view_file/get_files', pagination)
      return response.data
    } catch (error) {
      return Promise.reject()
    }
  },
  async editRow(rowId, data) {
    try {
      const response = await axios.post(`/view_file/edit_row/${rowId}`, data)
      return response
    } catch (error) {
      return Promise.reject()
    }
  },
  async deleteRow(fileId, data) {
    try {
      const response = await axios.post(`/view_file/delete_tag_row/${fileId}`, data)
      return response
    } catch (error) {
      return Promise.reject()
    }
  },
  async addFolioFile(fileId, data) {
    try {
      const response = await axios.post(`/view_file/add_folio_row/${fileId}`, data)
      return response
    } catch (error) {
      return Promise.reject()
    }
  },
  async reviewFile(fileId, data) {
    try {
      const response = await axios.post(`/view_file/review_tag_row/${fileId}`, data)
      return { data: response.data, status: response.status }
    } catch (error) {
      return Promise.reject()
    }
  },
  async noRealStateFile(fileId, data) {
    try {
      const response = await axios.post(`/view_file/no_real_state_tag_row/${fileId}`, data)
      return { data: response.data, status: response.status }
    } catch (error) {
      return Promise.reject()
    }
  },
  async taskView(id, pagination) {
    try {
      const response = await axios.post(`/view_file/task_view/${id}`, pagination)
      return { data: response.data, status: response.status }
    } catch (error) {
      return Promise.reject()
    }
  },
  async sendFile(importedFileId) {
    try {
      const response = await axios.post(`/view_file/send_file/${importedFileId}`)
      return { data: response.data, status: response.status }
    } catch (error) {
      return Promise.reject()
    }
  },
}
