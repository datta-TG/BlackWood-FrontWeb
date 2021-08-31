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
                class="form-control no-border w-full"
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
      fields: [],
      items: [],
      file: JSON.parse(localStorage.getItem('file')),
      apiResponse: {
        total_rows: 3,
        data: {
          schema: {
            fields: [
              {
                name: 'row_id',
                type: 'integer',
              },
              {
                name: 'case number',
                type: 'string',
              },
              {
                name: 'folio',
                type: 'string',
              },
              {
                name: 'petitioner name',
                type: 'string',
              },
              {
                name: 'property owner',
                type: 'string',
              },
              {
                name: 'filing date',
                type: 'string',
              },
              {
                name: 'type',
                type: 'string',
              },
              {
                name: 'extra 3',
                type: 'string',
              },
            ],
            primaryKey: [
              'row_id',
            ],
            pandas_version: '0.20.0',
          },
          data: [
            {
              row_id: 0,
              'case number': 'EV-123123-3',
              folio: '1',
              'petitioner name': null,
              'property owner': null,
              'filing date': null,
              type: null,
              'extra 3': null,
            },
            {
              row_id: 1,
              'case number': 'EV-123441-2',
              folio: '2',
              'petitioner name': null,
              'property owner': null,
              'filing date': null,
              type: null,
              'extra 3': null,
            },
            {
              row_id: 2,
              'case number': 'EV-123223-1',
              folio: '3',
              'petitioner name': null,
              'property owner': null,
              'filing date': null,
              type: null,
              'extra 3': null,
            },
          ],
        },
      },
    }
  },
  async mounted() {
    await this.viewFile()
  },
  methods: {
    viewFile() {
      const pagination = {
        base: false,
        skip: this.currentPage,
        limit: this.perPage,
      }
      services.viewFile(router.currentRoute.params.id, pagination).then(res => {
        if (res.status === 200) {
          this.totalRowsBase = res.total_rows
          this.totalRowsBase = res.total_rows
          if (res.data?.schema?.fields) {
            this.fields = res.data.schema.fields.map(field => field.name)
            this.fields.push('actions')
            this.items = res.data.data.map(item => ({ ...item, actions: false, delete: false }))
          }
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

      // pasar y borrar inicio
      const res = this.apiResponse
      this.totalRowsBase = res.total_rows
      if (res.data?.schema?.fields) {
        this.fields = res.data.schema.fields.map(field => field.name)
        this.fields.push('actions')
        this.items = res.data.data.map(item => ({ ...item, actions: false, delete: false }))
      }

      // pasar y borrar fin
    },
    editRow(rowId, row) {
      const dataRow = { ...row }

      delete dataRow.row_id
      delete dataRow.actions
      delete dataRow.delete

      const data = {
        row_id: rowId,
        data: dataRow,
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

      // borrar

      if (deleteRow) {
        // eslint-disable-next-line no-param-reassign
        row.delete = true
        setTimeout(() => {
          if (row.delete) {
            this.viewFile()
          }
        }, 2000)
      }

      // fin borrar

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

</style>
