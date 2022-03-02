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
        size="xl"
        ok-title="Accept"
      >
        <p>Here you can select fields that are displayed in the table area.</p>
        <b-row>
          <b-col
            v-for="(groupFields, key) in Array.from(propertyStackFields)"
            :key="key"
            sm="4"
          >
            <b-form-group

              :label="groupFields[0]"
            >
              <b-form-checkbox
                v-for="field in groupFields[1]"
                :key="field.key"
                v-model="fields"
                :value="field"
                name="flavour-3a"
                class="mt-1"
              >
                {{ field.label }}
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>

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

            <!-- Optional default data cell scoped slot -->
            <template #cell()="data">
              <div>
                <p v-if="data.field.date">
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
    </b-card>
  </div>
</template>

<script>
import {
  BCard, BTable, BRow, BCol, BPagination, BFormSelect, BButton, BModal, VBModal, BFormCheckbox, BFormGroup, VBToggle, BDropdown, BDropdownItem, BSpinner,
} from 'bootstrap-vue'
import services from '@/plugins/services/property-stack'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import propertyStackData from './data/index'

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
    BDropdown,
    BDropdownItem,
    BSpinner,
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
  },
  data() {
    return {
      fields: propertyStackData.fields.filter(item => item.active),
      items: [],
      perPage: 10,
      totalRows: 1,
      currentPage: 1,
      sortBy: 'folio',
      sortDesc: false,
      loading: false,
    }
  },
  computed: {
    propertyStackFields() {
      return this.groupBy(propertyStackData.fields.filter(item => item.visible), field => field.table)
    },
    configData() {
      return propertyStackData
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
  },
  methods: {
    column(key) {
      const object = propertyStackData.fields.find(field => field.key === key)
      if (object !== undefined) {
        return object
      }
      return key
    },
    groupBy(list, keyGetter) {
      const map = new Map()
      list.forEach(item => {
        const key = keyGetter(item)
        const collection = map.get(key)
        if (!collection) {
          map.set(key, [item])
        } else {
          collection.push(item)
        }
      })
      return map
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

      services.index(pagination).then(res => {
        if (res.status === 200) {
          this.totalRows = res.data.total_rows
          if (res.data) {
            this.items = res.data.data
          }
        }
        this.loading = false
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
        this.loading = false
      })
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
