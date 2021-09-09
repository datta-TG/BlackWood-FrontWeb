<template>
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
          empty-text="Task View Complete"
        >

          <!-- Column: Actions -->
          <template #cell(actions)="data">
            <div class="d-flex flex-row justify-content-center">
              <b-button
                v-if="!data.item.actions"
                variant="outline-warning"
                class="btn-icon"
                size="sm"
                @click="data.item.actions = true"
              >
                <span class="align-middle">Edit</span>
              </b-button>
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
                v-if="!data.item.delete"
                variant="outline-danger"
                class="btn-icon ml-25"
                size="sm"
                @click="deleteRow(data.item.row_id,data.item)"
              >
                <span class="align-middle">Delete</span>
              </b-button>
              <b-button
                v-else
                variant="outline-info"
                class="btn-icon ml-25"
                size="sm"
                @click="deleteRow(data.item.row_id,data.item,false)"
              >
                <span class="align-middle">Undo</span>
              </b-button>
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
              @input="taskView"
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
              @input="taskView"
            />
          </div>
        </div>
      </b-col>
      <b-col
        v-if="complete"
        cols="12"
        class="mt-2"
      >
        <div>
          <b-button
            type="reset"
            variant="outline-success"
            @click="sendFile"
          >
            Send File
          </b-button>
        </div>
      </b-col>
    </b-row>
  </component>
</template>

<script>
import {
  BCard, BTable, BRow, BCol, BPagination, BAlert, BFormSelect, BLink, BCardText, BButton,
} from 'bootstrap-vue'
import router from '@/router'
import services from '@/plugins/services/import-tool'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BCard, BTable, BRow, BCol, BPagination, BAlert, BFormSelect, BLink, BCardText, BButton,

  },
  data() {
    return {
      perPage: 10,
      totalRows: 1,
      currentPage: 1,
      complete: false,
      fields: [],
      items: [],
      file: JSON.parse(localStorage.getItem('file')),
    }
  },
  async mounted() {
    await this.taskView()
  },
  methods: {
    taskView() {
      const pagination = {
        base: false,
        skip: this.currentPage - 1,
        limit: this.perPage,
      }
      services.taskView(router.currentRoute.params.id, pagination).then(res => {
        if (res.status === 200) {
          this.totalRowsBase = res.data.total_rows
          this.complete = res.data.complete
          if (res.data?.data?.schema?.fields) {
            this.fields = res.data.data.schema.fields.map(field => field.name).filter(field => !['__deleted__', '__review__', '__blocked__'].includes(field))
            this.fields.push('actions')
            // eslint-disable-next-line no-underscore-dangle
            this.items = res.data.data.data.filter(item => item.metadata.__deleted__ === false).map(item => ({ ...item, actions: false, delete: false }))
          } else {
            this.items = []
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
      services.editRow(router.currentRoute.params.id, data).then(() => {
        // eslint-disable-next-line no-param-reassign
        this.taskView()

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
              this.taskView()
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
    sendFile() {
      services.sendFile(router.currentRoute.params.id).then(res => {
        if (res.status === 200) {
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'File Send Successfully',
              icon: 'BellIcon',
              variant: 'success',
            },
          })
          this.$router.push({ name: 'imported-files' })
        }
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
