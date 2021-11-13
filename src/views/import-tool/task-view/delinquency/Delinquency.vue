<template>
  <div>
    <b-card>
      <b-row class="mb-1">
        <b-col
          cols="12"
        >
          <b-button
            v-b-modal.modal-config
            variant="primary"
            class="btn-icon"
          >
            <feather-icon icon="SettingsIcon" />
          </b-button>
        </b-col>
      </b-row>
      <b-modal
        id="modal-config"
        title="Manage Columns"
        ok-only
        ok-title="Accept"
      >
        <b-form-group
          label=" Here you can select fields that are displayed in the table area."
        >
          <b-form-checkbox
            v-for="field in delinquencyFields"
            :key="field.key"
            v-model="fields"
            :value="field"
            name="flavour-3a"
            class="mt-1"
          >
            {{ field.label }}
          </b-form-checkbox>
        </b-form-group>
      </b-modal>
      <b-table
        responsive
        :items="items"
        :fields="[...fields].sort(sortMethod)"
        bordered
        class="mb-2"
        show-empty
        empty-text="No records found"
      >

        <!-- Column: Actions -->
        <template #cell(actions)="data">
          <div class="d-flex flex-row justify-content-center">
            <b-button
              variant="outline-success"
              class="btn-icon mr-25"
              size="sm"
              @click="sendRow(data.item)"
            >
              <span class="align-middle">Send</span>
            </b-button>
            <b-button
              v-b-toggle.sidebar-edit
              variant="outline-secondary"
              class="btn-icon mr-25"
              size="sm"
              @click="editRow(data.item)"
            >
              <span class="align-middle">Edit</span>
            </b-button>
            <b-button
              v-b-toggle.sidebar-folios
              variant="outline-primary"
              class="btn-icon mr-25"
              size="sm"
              @click="editFolio(data.item)"
            >
              <span class="align-middle">Folios</span>
            </b-button>
            <b-button
              variant="outline-danger"
              class="btn-icon"
              size="sm"
              @click="deleteRow(data.item)"
            >
              <span class="align-middle">Delete</span>
            </b-button>
          </div>
        </template>

        <!-- Optional default data cell scoped slot -->
        <template #cell()="data">
          <div>
            <p v-if="!data.field.multiple">
              {{ data.value }}
            </p>
            <ul
              v-else
            >
              <li
                v-for="item in data.item[data.field.key]"
                :key="item.id"
              >
                {{ item.value }}
              </li>
            </ul>
          </div>
        </template>
      </b-table>
      <b-row>
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
                @input="viewData"
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
                @input="viewData"
              />
            </div>
          </div>
        </b-col>
      </b-row>
      <b-sidebar
        id="sidebar-edit"
        backdrop-variant="dark"
        backdrop
        width="720px"
        right
        shadow
      >
        <div class="px-3 py-2">
          <form-update :data="editData" />
        </div>
      </b-sidebar>
      <b-sidebar
        id="sidebar-folios"
        backdrop-variant="dark"
        backdrop
        width="720px"
        right
        shadow
      >
        <div class="px-3 py-2">
          <form-folios :data="editData" />
        </div>
      </b-sidebar>
    </b-card>
  </div>
</template>

<script>
import {
  BCard, BTable, BRow, BCol, BPagination, BFormSelect, BButton, BModal, VBModal, BFormCheckbox, BFormGroup, BSidebar, VBToggle,
} from 'bootstrap-vue'
// import services from '@/plugins/services/import-tool'
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import delinquencyData from '@/views/import-tool/task-view/delinquency'
import FormUpdate from '@/views/import-tool/task-view/delinquency/FormUpdate.vue'
import FormFolios from '@/views/import-tool/task-view/delinquency/FormFolios.vue'

export default {
  components: {
    BCard,
    BTable,
    BRow,
    BCol,
    BPagination,
    BFormSelect,
    BButton,
    BModal,
    BFormCheckbox,
    BFormGroup,
    BSidebar,

    FormUpdate,
    FormFolios,
  },
  directives: {
    'b-modal': VBModal,
    'b-toggle': VBToggle,
  },
  data() {
    return {
      fields: delinquencyData.filter(item => item.active),
      items: [],
      perPage: 10,
      totalRows: 1,
      currentPage: 1,
      editData: null,
    }
  },
  computed: {
    delinquencyFields() {
      return delinquencyData.filter(item => item.visible)
    },
  },
  async mounted() {
    await this.viewData()
  },
  methods: {
    sortMethod(a, b) {
      if (a.id > b.id) {
        return 1
      }
      if (a.id < b.id) {
        return -1
      }
      return 0
    },
    viewData() {
      // const pagination = {
      //  skip: this.currentPage - 1,
      //   limit: this.perPage,
      // }
      // borrar
      const dummyData = [{
        tax_delinquency_id: 1,
        folio_db: [{
          id: 1,
          value: '45FD3-C',
        }, {
          id: 2,
          value: '64FD3-D',
        }],
        folio_file: null,
        earliest_yr: 'xsda',
        account_status: 'a',
        cert_status: 'a',
        deed_status: 'b',
        owner_name: 'pablo',
        count_tax_year: '2021',
        sum_amount: '1232',
        fips: 'true',
        homestead: '432',
        actions: true,
      }]
      this.items = dummyData
      // fin borrar
      // services.viewImportedFiles(pagination).then(res => {
      //  this.totalRows = res.total_rows
      //  if (res.data) {
      //   this.items = res.data
      //  }
      // })
    },
    editRow(row) {
      this.editData = row
    },
    editFolio(row) {
      this.editData = row
    },
    sendRow(row) {
      this.$swal({
        title: 'Are you sure?',
        text: 'Row will be added to the Data Base!',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Yes, add it!',
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-secondary ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          console.log(row)
        } else {
          console.log(row)
        }
      })
    },
    deleteRow(row) {
      this.$swal({
        title: 'Are you sure?',
        text: 'Row will be deleted!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        customClass: {
          confirmButton: 'btn btn-warning',
          cancelButton: 'btn btn-secondary ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          console.log(row)
        } else {
          console.log(row)
        }
      })
    },
  },
}
</script>

<style>
    .b-sidebar {
        background-color: white !important;
    }
</style>
