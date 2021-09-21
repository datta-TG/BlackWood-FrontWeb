<template>
  <div>
    <!-- Filters -->
    <imported-file-tags-filter
      :tags-filter.sync="tagsFilter"
      :tags-options="tagsOptions"
    />

    <component :is="file === undefined ? 'div' : 'b-card'">
      <!-- Alert: No item found -->
      <b-alert
        variant="danger"
        :show="file === undefined"
      >
        <h4 class="alert-heading">
          Error fetching file data
        </h4>
        <div class="alert-body">
          No file found with this id. Check
          <b-link
            class="alert-link"
            :to="{ name: 'imported-files'}"
          >
            Imported Files
          </b-link>
          for other file.
        </div>
      </b-alert>

      <b-row
        v-if="fields.length > 0"
        class="mb-1"
      >
        <b-col
          cols="12"
          class="mb-2"
        >
          <div>
            <b-card-text class="mb-25">
              <b>File:</b> {{ file.file_name }}
            </b-card-text>
            <b-card-text class="mb-25">
              <b>Upload Date:</b> {{ file.upload_date | formatDate }}
            </b-card-text>
          </div>
        </b-col>
        <b-col cols="12">
          <b-table
            responsive
            bordered
            :items="items"
            :fields="fields"
            class="mb-2"
            show-empty
            empty-text="No records found"
          >

            <!-- Column: Actions -->
            <template #cell(actions)="data">
              <div class="d-flex flex-row justify-content-center">
                <b-button
                  v-if="data.item.actions"
                  variant="outline-info"
                  class="btn-icon"
                  size="sm"
                  @click="editRow(data.item.row_id,data.item)"
                >
                  <span class="align-middle">Save</span>
                </b-button>
                <b-button
                  v-if="data.item.delete"
                  variant="outline-info"
                  class="btn-icon ml-25"
                  size="sm"
                  @click="deleteRow(data.item.row_id,data.item,false)"
                >
                  <span class="align-middle">Undo</span>
                </b-button>
                <b-dropdown
                  variant="link"
                  toggle-class="text-decoration-none"
                  no-caret
                >
                  <template v-slot:button-content>
                    <feather-icon
                      icon="MoreVerticalIcon"
                      size="16"
                      class="text-body align-middle mr-25"
                    />
                  </template>
                  <b-dropdown-item
                    v-if="!data.item.actions"
                    @click="data.item.actions = true"
                  >
                    <feather-icon
                      icon="Edit2Icon"
                      class="mr-50"
                    />
                    <span>Edit</span>
                  </b-dropdown-item>
                  <b-dropdown-item
                    v-if="!data.item.delete"
                    @click="deleteRow(data.item.row_id,data.item)"
                  >
                    <feather-icon
                      icon="TrashIcon"
                      class="mr-50"
                    />
                    <span>Delete</span>
                  </b-dropdown-item>
                  <b-dropdown-item @click="reviewFile(data.item.row_id)">
                    <feather-icon
                      icon="EyeIcon"
                      class="mr-50"
                    />
                    <span>Review</span>
                  </b-dropdown-item>
                  <b-dropdown-item @click="noRealStateFile(data.item.row_id)">
                    <feather-icon
                      icon="FileIcon"
                      class="mr-50"
                    />
                    <span>No Real State</span>
                  </b-dropdown-item>
                  <b-dropdown-item @click="addFolioFile(data.item.row_id)">
                    <feather-icon
                      icon="PlusIcon"
                      class="mr-50"
                    />
                    <span>Add Folio</span>
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </template>
            <!-- Optional default data cell scoped slot -->
            <template #cell()="data">
              <div>
                <span v-if="!data.item.actions || data.field.key === 'row_id'">{{ data.value }}</span>
                <input
                  v-else
                  v-model="data.item[data.field.key]"
                  type="text"
                  class="input-table form-control no-border w-full"
                >
              </div>
            </template>
          </b-table>
        </b-col>
        <b-col cols="12">
          <!-- pagination -->
          <div class="d-flex justify-content-between flex-wrap">
            <div class="d-flex align-items-center mb-0">
              <span class="text-nowrap ">
                Show
              </span>
              <b-form-select
                v-model="perPage"
                :options="['10','15','20']"
                class="mx-1"
                @input="viewFile"
              />
              <span class="text-nowrap"> entries </span>
            </div>
            <div>
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="right"
                size="md"
                class="my-0"
                @input="viewFile"
              />
            </div>
          </div>
        </b-col>
      </b-row>
    </component>
  </div>
</template>

<script>
import {
  BCard, BTable, BRow, BCol, BPagination, BAlert, BFormSelect, BLink, BCardText, BButton, BDropdown, BDropdownItem,
} from 'bootstrap-vue'
import router from '@/router'
import services from '@/plugins/services/import-tool'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import ImportedFileTagsFilter from './ImportedFileTagsFilter.vue'

export default {
  components: {
    BCard, BTable, BRow, BCol, BPagination, BAlert, BFormSelect, BLink, BCardText, BButton, BDropdown, BDropdownItem, ImportedFileTagsFilter,

  },
  data() {
    return {
      perPage: 10,
      totalRows: 1,
      currentPage: 1,
      fields: [],
      items: [],
      tagsFilter: [],
      tagsOptions: [],
      file: JSON.parse(localStorage.getItem('file')),
    }
  },
  watch: {
    tagsFilter() {
      this.viewFile()
    },
  },
  async mounted() {
    await this.getTags()
    await this.viewFile()
  },
  methods: {
    getTags() {
      services.getTags().then(res => {
        if (res.status === 200) {
          this.tagsOptions = res.data.tags.map(tag => ({
            name: tag.replace('_', ' '), value: tag,
          }))
        }
      })
    },
    addFolioFile(rowId) {
      this.$swal({
        title: 'Type Folio',
        text: 'Please type the new folio to link to the Case Number',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off',
        },
        showCancelButton: true,
        confirmButtonText: 'Add',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-secondary ml-1',
          input: 'mt-2 mb-2',
        },
        showLoaderOnConfirm: true,
        preConfirm: folio => services.addFolioFile(rowId, folio)
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .catch(error => {
            this.$swal.showValidationMessage(
              `Request failed: ${error}`,
            )
          }),
        allowOutsideClick: () => !this.$swal.isLoading(),
      }).then(result => {
        // eslint-disable-next-line no-console
        console.log(result)
      })
    },
    reviewFile(rowId) {
      const data = {
        row_id: rowId,
        value: true,
      }
      services.reviewFile(router.currentRoute.params.id, data).then(res => {
        if (res.status === 200) {
          this.viewFile()
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Review Successfully',
              icon: 'BellIcon',
              variant: 'success',
            },
          })
        }
      })
    },
    noRealStateFile(rowId) {
      const data = {
        row_id: rowId,
        value: true,
      }
      services.noRealStateFile(router.currentRoute.params.id, data).then(res => {
        if (res.status === 200) {
          this.viewFile()
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'No Real State Successfully',
              icon: 'BellIcon',
              variant: 'success',
            },
          })
        }
      })
    },
    viewFile() {
      const pagination = {
        base: false,
        skip: this.currentPage - 1,
        limit: this.perPage,
        tags: this.tagsFilter,
      }
      services.viewFile(router.currentRoute.params.id, pagination).then(res => {
        if (res.status === 200) {
          this.totalRows = res.data.total_rows
          if (res.data?.data?.schema?.fields) {
            this.fields = res.data.data.schema.fields.map(field => field.name).filter(field => !['__deleted__', '__no_real_state__', '__review__', '__blocked__'].includes(field))
            this.fields.push('actions')
            // eslint-disable-next-line no-underscore-dangle
            this.items = res.data.data.data.map(item => ({ ...item, actions: false, delete: false }))
          }
        }
      })
    },
    removeEmpty(obj) {
      return Object.fromEntries(
        Object.entries(obj)
          // eslint-disable-next-line no-unused-vars
          .filter(([_, v]) => v != null)
          .map(([k, v]) => [k, v === Object(v) ? this.removeEmpty(v) : v]),
      )
    },
    editRow(rowId, row) {
      const dataRow = { ...row }

      delete dataRow.row_id
      delete dataRow.actions
      delete dataRow.delete
      delete dataRow.metadata

      const data = {
        row_id: rowId,
        data: this.removeEmpty(dataRow),
      }
      // eslint-disable-next-line no-param-reassign
      row.actions = false
      services.editRow(router.currentRoute.params.id, data).then(() => {
        // eslint-disable-next-line no-param-reassign
        row.actions = false
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Update Successfully',
            icon: 'BellIcon',
            variant: 'success',
          },
        })
      }).catch(() => {
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Error',
            icon: 'BellIcon',
            variant: 'danger',
          },
        })
      })
    },
    deleteRow(rowId, row, deleteRow = true) {
      const data = {
        row_id: rowId,
        delete: deleteRow,
      }

      if (!deleteRow) {
        // eslint-disable-next-line no-param-reassign
        row.delete = false
      }

      services.deleteRow(router.currentRoute.params.id, data).then(() => {
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Delete Successfully',
            icon: 'BellIcon',
            variant: 'success',
          },
        })
        if (deleteRow) {
          // eslint-disable-next-line no-param-reassign
          row.delete = true
          setTimeout(() => {
            if (row.delete) {
              this.viewFile()
            }
          }, 2000)
        }
      }).catch(() => {
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Error',
            icon: 'BellIcon',
            variant: 'danger',
          },
        })
      })
    },
  },
}
</script>

<style>
.input-table:focus{
  min-width: 100px;
}

.input-table{
  min-width: 70px;
}
</style>
