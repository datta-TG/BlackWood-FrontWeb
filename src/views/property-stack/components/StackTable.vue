<template>
  <div>
    <b-card>
      <b-row class="mb-1">
        <b-col
          cols="11"
        >
          <div class="d-flex flex-row">
            <b-button
              variant="primary"
              class="btn-icon mr-25"
              @click="viewData"
            >
              <feather-icon icon="RefreshCcwIcon" />
            </b-button>
            <b-button
              v-b-modal.modal-config
              variant="primary"
              class="btn-icon"
            >
              <feather-icon icon="SettingsIcon" />
            </b-button>
          </div>
        </b-col>
        <b-col cols="1">
          <div class="d-flex justify-content-end">
            <b-spinner
              v-if="loading"
              label="Loading..."
              class="loading"
              variant="primary"
            />
          </div>
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
            v-for="field in coreIndicatorFields"
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
      <b-row class="mb-2">
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
      <b-row>
        <b-col cols="12">
          <b-table
            :items="items"
            :fields="[...fields].sort(sortMethod)"
            bordered
            responsive
            class="mb-2 mw-100"
            show-empty
            empty-text="No records found"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :no-local-sorting="true"
          >
            <!-- Column: tag -->
            <template #cell(tag)="data">
              <div lass="d-flex flex-row justify-content-center">
                <v-select
                  v-model="data.item.tag"
                  class="w-100 input-table"
                  placeholder="Tags"
                  :options="tagsOptions"
                  @input="setTag"
                  @open="focus(data.item)"
                />
              </div>
            </template>

            <template #cell(show_details)="row">
              <b-form-checkbox
                v-model="row.detailsShowing"
                plain
                class="vs-checkbox-con"
                @change="row.toggleDetails"
              >
                <span class="vs-checkbox">
                  <span class="vs-checkbox--check">
                    <i class="vs-icon feather icon-check" />
                  </span>
                </span>
                <span class="vs-label">{{
                  row.detailsShowing ? "Hide" : "Show"
                }}</span>
              </b-form-checkbox>
            </template>

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
                    @click="data.toggleDetails"
                  >
                    <feather-icon
                      icon="UsersIcon"
                      class="mr-50"
                    />
                    <span>People</span>
                  </b-dropdown-item>
                  <b-dropdown-item
                    v-b-modal.modal-2
                    @click="showInfo(data.item)"
                  >
                    <feather-icon
                      icon="FileIcon"
                      class="mr-50"
                    />
                    <span>Info</span>
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </template>

            <template #row-details="row">
              <b-table
                :items="row.item.people"
                bordered
                class="mb-2 mw-100"
                show-empty
                empty-text="No records found"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :no-local-sorting="true"
              />
              <b-button
                size="sm"
                variant="outline-secondary"
                @click="row.toggleDetails"
              >
                Hide Details
              </b-button>
            </template>

            <template #cell(item_example)="row">
              <div class="d-flex flex-row justify-content-center">
                <b-button
                  variant="outline-primary"
                  class="btn-icon"
                  size="sm"
                  @click="row.toggleDetails"
                >
                  {{ row.detailsShowing ? 'Hide' : 'Show' }}
                </b-button>
              </div>
            </template>

            <!-- Optional default data cell scoped slot -->
            <template #cell()="data">
              <div>
                <ul
                  v-if="data.field.multiple"
                >
                  <li
                    v-for="item in data.item[data.field.key]"
                    :key="item[data.field.multiple_settings.id]"
                  >
                    {{ item[data.field.multiple_settings.value] }}
                  </li>
                </ul>
                <p v-else-if="data.field.date">
                  {{ data.value | formatDate() }}
                </p>
                <p v-else>
                  {{ data.value }}
                </p>
              </div>
            </template>
          </b-table>
        </b-col>
      </b-row>
      <b-sidebar
        id="sidebar-edit"
        backdrop-variant="dark"
        :bg-variant="settings.skin.value"
        backdrop
        width="720px"
        right
        shadow
      >
        <template #default="{ hide }">
          <div class="px-3 py-2">
            <form-update
              :core-indicator="coreIndicator"
              :core-indicator-config="configData"
              :core="editData"
              @close="hide"
              @reload="viewData"
            />
          </div>
        </template>
      </b-sidebar>
      <b-sidebar
        id="sidebar-folios"
        backdrop-variant="dark"
        backdrop
        width="720px"
        :bg-variant="settings.skin.value"
        right
        shadow
      >
        <template #default="{ hide }">
          <div class="px-3 py-2">
            <form-folios
              :core-indicator="coreIndicator"
              :core="editData"
              @close="hide"
              @reload="viewData"
            />
          </div>
        </template>
      </b-sidebar>
    </b-card>
  </div>
</template>

<script>
import {
  BCard, BTable, BRow, BCol, BPagination, BFormSelect, BButton, BModal, VBModal, BFormCheckbox, BFormGroup, BSidebar, VBToggle, BDropdown, BDropdownItem, BSpinner,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import services from '@/plugins/services/import-tool'
import FormUpdate from '@/views/import-tool/task-view/FormUpdate.vue'
import FormFolios from '@/views/import-tool/task-view/FormFolios.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useAppConfig from '@core/app-config/useAppConfig'
import fakeData from './fakedata'

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
    BSpinner,
    vSelect,

    FormUpdate,
    FormFolios,
  },
  directives: {
    'b-modal': VBModal,
    'b-toggle': VBToggle,
  },
  props: {
    coreIndicator: {
      type: String,
      default: '',
    },
    coreIndicatorData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      fields: this.coreIndicatorData.fields.filter(item => item.active),
      items: [],
      perPage: 10,
      totalRows: 1,
      currentPage: 1,
      sortBy: 'id',
      sortDesc: false,
      editData: null,
      loading: false,
      tagsOptions: [],
      focusItem: null,
      settings: useAppConfig(),
    }
  },
  computed: {
    coreIndicatorFields() {
      return this.coreIndicatorData.fields.filter(item => item.visible)
    },
    configData() {
      return this.coreIndicatorData
    },
  },
  watch: {
    sortBy() {
      this.viewData()
    },
    sortDesc() {
      this.viewData()
    },
  },
  async mounted() {
    await this.viewData()
    await this.getTags()
  },
  methods: {
    getTags() {
      services.getTaskViewTags().then(res => {
        if (res.status === 200) {
          this.tagsOptions = res.data.tags
        }
      }).catch(error => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Error',
            icon: 'BellIcon',
            text: error,
            variant: 'danger',
          },
        })
      })
    },
    column(key) {
      const object = this.coreIndicatorData.fields.find(field => field.key === key)
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
      this.loading = true
      const pagination = {
        skip: this.currentPage - 1,
        limit: this.perPage,
        order_by_column: this.sortBy,
        order_by_ascending: !this.sortDesc,
      }

      services.taskViewCoreIndicator(this.coreIndicator, pagination).then(res => {
        this.loading = false
        this.totalRows = res.total_rows
        if (res.data) {
          this.items = res.data
        }
      }).catch(error => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Error',
            icon: 'BellIcon',
            text: error,
            variant: 'danger',
          },
        })
        this.items = fakeData
        this.loading = false
      })
    },
    editRow(row) {
      this.editData = row
    },
    editFolio(row) {
      this.editData = row
    },
    focus(item) {
      this.focusItem = item
    },
    setTag(val) {
      if (val !== null) {
        this.$swal({
          title: 'Are you sure?',
          text: val === 'Complete' ? 'Row will be added to the Data Base!' : 'Row will be tagged',
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Yes, do it!',
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-secondary ml-1',
          },
          buttonsStyling: false,
        }).then(result => {
          if (result.value) {
            this.loading = true
            services.tagRow(this.coreIndicator, this.focusItem.id, val).then(res => {
              this.loading = false
              if (res.status === 200) {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Complete',
                    icon: 'BellIcon',
                    text: res.data.message,
                    variant: 'success',
                  },
                })
                this.viewData()
              }
            }).catch(error => {
              this.loading = false
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Error',
                  icon: 'BellIcon',
                  text: error,
                  variant: 'danger',
                },
              })
              this.viewData()
            })
          }
        })
      }
    },
    openTable(row) {
      // eslint-disable-next-line no-console
      console.log(row)
    },
    showInfo(row) {
      // eslint-disable-next-line no-console
      console.log(row)
    },
  },
}
</script>

<style>

     .table-responsive {
        min-height: 200px;
        padding-bottom: 120px !important;
      }

      .input-table{
        min-width: 100px;
}
</style>
