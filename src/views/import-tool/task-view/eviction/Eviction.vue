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
            v-for="field in evictionFields"
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
                @click="deleteRow(data.item)"
              >
                <feather-icon
                  icon="TrashIcon"
                  class="mr-50"
                />
                <span>Delete</span>
              </b-dropdown-item>
              <b-dropdown-item
                v-b-toggle.sidebar-folios
                @click="editFolio(data.item)"
              >
                <feather-icon
                  icon="EyeIcon"
                  class="mr-50"
                />
                <span>Folios</span>
              </b-dropdown-item>
              <b-dropdown-item
                v-b-toggle.sidebar-edit
                @click="editRow(data.item)"
              >
                <feather-icon
                  icon="FileIcon"
                  class="mr-50"
                />
                <span>Edit</span>
              </b-dropdown-item>
              <b-dropdown-item @click="sendRow(data.item)">
                <feather-icon
                  icon="PlusIcon"
                  class="mr-50"
                />
                <span>Send</span>
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </template>

        <template #cell(item_example)="row">
          <div class="d-flex flex-row justify-content-center">
            <b-button
              v-if="row.item.bd_register != null"
              variant="outline-primary"
              class="btn-icon"
              size="sm"
              @click="row.toggleDetails"
            >
              {{ row.detailsShowing ? 'Hide' : 'Show' }}
            </b-button>
          </div>
        </template>

        <template #row-details="row">
          <b-card>
            <b-row
              class="mb-2"
            >
              <b-col
                v-for="core in Object.keys(row.item.bd_register)"
                :key="core"
                md="6"
                class="text-sm"
              >
                <div class="d-flex justify-content-center">
                  <p class="w-50 text-sm">
                    <strong>{{ column(core).label }}</strong>
                  </p>
                  <div class="w-50">
                    <p v-if="!column(core).multiple">
                      {{ row.item.bd_register[core] }}
                    </p>
                    <ul
                      v-else
                    >
                      <li
                        v-for="item in row.item.bd_register[core]"
                        :key="item[column(core).multiple_settings.id]"
                      >
                        {{ item[column(core).multiple_settings.value] }}
                      </li>
                    </ul>
                  </div>
                </div>
              </b-col>
            </b-row>

            <b-button
              size="sm"
              @click="row.toggleDetails"
            >
              Hide Details
            </b-button>
          </b-card>
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
                :key="item[data.field.multiple_settings.id]"
              >
                {{ item[data.field.multiple_settings.value] }}
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
          <form-update
            :fields="configData"
            :data="editData"
          />
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
  BCard, BTable, BRow, BCol, BPagination, BFormSelect, BButton, BModal, VBModal, BFormCheckbox, BFormGroup, BSidebar, VBToggle, BDropdown, BDropdownItem,
} from 'bootstrap-vue'
import services from '@/plugins/services/import-tool'
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import evictionData from '@/views/import-tool/task-view/eviction'
import FormUpdate from '@/views/import-tool/task-view/eviction/FormUpdate.vue'
import FormFolios from '@/views/import-tool/task-view/eviction/FormFolios.vue'

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
    BDropdown,
    BDropdownItem,

    FormUpdate,
    FormFolios,
  },
  directives: {
    'b-modal': VBModal,
    'b-toggle': VBToggle,
  },
  data() {
    return {
      fields: evictionData.filter(item => item.active),
      items: [],
      perPage: 10,
      totalRows: 1,
      currentPage: 1,
      editData: null,
    }
  },
  computed: {
    evictionFields() {
      return evictionData.filter(item => item.visible)
    },
    configData() {
      return evictionData
    },
  },
  async mounted() {
    await this.viewData()
  },
  methods: {
    column(key) {
      const object = evictionData.find(field => field.key === key)
      if (object !== undefined) {
        return object
      }
      return key
    },
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
      const pagination = {
        skip: this.currentPage - 1,
        limit: this.perPage,
      }

      services.taskViewEviction(pagination).then(res => {
        this.totalRows = res.total_rows
        if (res.data) {
          this.items = res.data
        }
      })
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
