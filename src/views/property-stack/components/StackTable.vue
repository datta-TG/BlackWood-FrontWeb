<template>
  <div>
    <b-card>
      <b-row class="mb-1">
        <b-col
          cols="12"
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
            :busy="loading"
          >
            <template #table-busy>
              <div class="text-center text-primary my-2">
                <b-spinner
                  class="align-middle"
                  variant="primary"
                />
                <strong> Loading...</strong>
              </div>
            </template>
            <!-- Column: Actions -->
            <template #cell(actions)="data">
              <div class="d-flex flex-row justify-content-center">
                <b-button
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  variant="outline-primary"
                  size="sm"
                  class="mr-1"
                  @click="data.toggleDetails"
                >
                  <span class="align-middle">People</span>
                </b-button>
                <b-button
                  v-b-modal.modal-2
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  variant="outline-primary"
                  size="sm"
                  @click="showInfo(data.item)"
                >
                  <span class="align-middle">Info</span>
                </b-button>

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
  BCard, BTable, BRow, BCol, BPagination, BFormSelect, BButton, BModal, VBModal, BFormCheckbox, BFormGroup, VBToggle, BSpinner,
} from 'bootstrap-vue'
import services from '@/plugins/services/property-stack'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'
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
    BSpinner,
  },
  directives: {
    'b-modal': VBModal,
    'b-toggle': VBToggle,
    Ripple,
  },
  props: {
    filter: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      fields: propertyStackData.fields.filter(item => item.active),
      items: [],
      tables: [],
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
    filter() {
      Object.entries(this.filter).forEach(table => {
        if (table[0] !== 'property') {
          if (!(this.tables.includes(table[0]))) {
            this.tables.push(table[0])
          }
        }
      })
      this.viewData()
    },
    fields() {
      const tables = []
      this.fields.forEach(field => {
        if (field.table !== 'property' && field.key !== 'actions') {
          if (tables.indexOf(field.table) === -1) {
            tables.push(field.table)
          }
        }
      })
      if (!this.arraysEqual(this.tables, tables)) {
        this.tables = tables
        this.viewData()
      }
    },
  },
  async mounted() {
    await this.viewData()
  },
  methods: {
    arraysEqual(a1, a2) {
      return JSON.stringify(a1) === JSON.stringify(a2)
    },
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
        tables: this.tables,
        filter: this.filter,
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
