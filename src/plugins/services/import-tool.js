import axios from '@axios'

const ERROR_500 = 'Internal Server Error'

// Endpoints
export default {
  async getCounties() {
    try {
      const response = await axios.get('/import_tool/counties')
      return response.data
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.detail)
      }
      return Promise.reject(ERROR_500)
    }
  },
  async getFileTypes(id) {
    try {
      const response = await axios.get(`/import_tool/filetypes/${id}`)
      return response.data
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.detail)
      }
      return Promise.reject(ERROR_500)
    }
  },
  async getTags() {
    try {
      const response = await axios.get('/import_tool/upload_file/get_tags')
      return { data: response.data, status: response.status }
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.detail)
      }
      return Promise.reject(ERROR_500)
    }
  },
  async getAllFileTypes() {
    try {
      const response = await axios.get('/import_tool/filetypes')
      return response.data
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.detail)
      }
      return Promise.reject(ERROR_500)
    }
  },
  async uploadFile(data) {
    try {
      const response = await axios.post('/import_tool/upload_file/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.detail)
      }
      return Promise.reject(ERROR_500)
    }
  },
  async viewFile(id, pagination) {
    try {
      const response = await axios.post(`/import_tool/view_file/${id}`, pagination)
      return { data: response.data, status: response.status }
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.detail)
      }
      return Promise.reject(ERROR_500)
    }
  },
  async mapColumns(importedFileId, data) {
    try {
      const response = await axios.post(`/import_tool/upload_file/map_columns/${importedFileId}`, data)
      return response.data
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.detail)
      }
      return Promise.reject(ERROR_500)
    }
  },
  async commitUpload(importedFileId) {
    try {
      const response = await axios.post(`/import_tool/upload_file/commit_upload/${importedFileId}`)
      return response.data
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.detail)
      }
      return Promise.reject(ERROR_500)
    }
  },
  async abortUpload(importedFileId) {
    try {
      const response = await axios.delete(`/import_tool/upload_file/abort_upload/${importedFileId}`)
      return response.data
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.detail)
      }
      return Promise.reject(ERROR_500)
    }
  },

  // imported files

  async pendingTasks() {
    try {
      const response = await axios.get('/import_tool/task_view/pending_tasks')
      return response.data
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.detail)
      }
      return Promise.reject(ERROR_500)
    }
  },

  async getTaskViewTags() {
    try {
      const response = await axios.get('/import_tool/task_view/tags')
      return { data: response.data, status: response.status }
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.detail)
      }
      return Promise.reject(ERROR_500)
    }
  },

  async foliosMatch(query) {
    try {
      const response = await axios.get(`/import_tool/task_view/property/folios?query_folio=${query}`)
      return { data: response.data, status: response.status }
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.detail)
      }
      return Promise.reject(ERROR_500)
    }
  },

  async taskViewCoreIndicator(coreIndicator, pagination) {
    try {
      const response = await axios.post(`/import_tool/task_view/${coreIndicator}/index`, pagination)
      return response.data
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.detail)
      }
      return Promise.reject(ERROR_500)
    }
  },

  async updateCoreIndicator(coreIndicator, core) {
    try {
      const response = await axios.post(`/import_tool/task_view/${coreIndicator}/update`, core)
      return { data: response.data, status: response.status }
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.detail)
      }
      return Promise.reject(ERROR_500)
    }
  },

  async updateFoliosCoreIndicator(coreIndicator, data) {
    try {
      const response = await axios.post(`/import_tool/task_view/${coreIndicator}/update/properties`, data)
      return { data: response.data, status: response.status }
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.detail)
      }
      return Promise.reject(ERROR_500)
    }
  },

  async deleteCoreIndicator(coreIndicator, id) {
    try {
      const dataPayload = {
        ids: [id],
      }
      const response = await axios.delete(`/import_tool/task_view/${coreIndicator}/delete`, { data: dataPayload })
      return { data: response.data, status: response.status }
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.detail)
      }
      return Promise.reject(ERROR_500)
    }
  },

  async tagRow(coreIndicator, id, tag) {
    try {
      const data = {
        ids: [id],
        tag,
      }
      const response = await axios.post(`/import_tool/task_view/${coreIndicator}/tag`, data)
      return { data: response.data, status: response.status }
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.detail)
      }
      return Promise.reject(ERROR_500)
    }
  },

  async viewImportedFiles(pagination) {
    try {
      const response = await axios.post('/view_file/get_files', pagination)
      return response.data
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.detail)
      }
      return Promise.reject(ERROR_500)
    }
  },
  async editRow(rowId, data) {
    try {
      const response = await axios.post(`/view_file/edit_row/${rowId}`, data)
      return response
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.detail)
      }
      return Promise.reject(ERROR_500)
    }
  },
  async deleteRow(fileId, data) {
    try {
      const response = await axios.post(`/view_file/delete_tag_row/${fileId}`, data)
      return response
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.detail)
      }
      return Promise.reject(ERROR_500)
    }
  },
  async addFolioFile(fileId, data) {
    try {
      const response = await axios.post(`/view_file/add_folio_row/${fileId}`, data)
      return response
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.detail)
      }
      return Promise.reject(ERROR_500)
    }
  },
  async reviewFile(fileId, data) {
    try {
      const response = await axios.post(`/view_file/review_tag_row/${fileId}`, data)
      return { data: response.data, status: response.status }
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.detail)
      }
      return Promise.reject(ERROR_500)
    }
  },
  async noRealStateFile(fileId, data) {
    try {
      const response = await axios.post(`/view_file/no_real_state_tag_row/${fileId}`, data)
      return { data: response.data, status: response.status }
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.detail)
      }
      return Promise.reject(ERROR_500)
    }
  },
  async taskView(id, pagination) {
    try {
      const response = await axios.post(`/view_file/task_view/${id}`, pagination)
      return { data: response.data, status: response.status }
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.detail)
      }
      return Promise.reject(ERROR_500)
    }
  },
  async sendFile(importedFileId) {
    try {
      const response = await axios.post(`/view_file/send_file/${importedFileId}`)
      return { data: response.data, status: response.status }
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.detail)
      }
      return Promise.reject(ERROR_500)
    }
  },
}
