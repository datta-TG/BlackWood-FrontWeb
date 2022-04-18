<template>
  <b-card class="p-1">
    <!------ Header ------>
    <b-row class="d-flex justify-content-between align-items-center">
      <b-button
        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
        v-b-toggle.sidebar-filters
        variant="primary"
        class="btn-icon"
      >
        <feather-icon icon="FilterIcon" />
        Filters
      </b-button>
      <b-col
        lg="6"
      >
        <b-input-group>
          <b-input-group-prepend is-text>
            <feather-icon icon="SearchIcon" />
          </b-input-group-prepend>
          <b-form-input
            v-model="search"
            placeholder="Search"
          />
          <b-input-group-append>
            <b-button
              variant="outline-primary"
              @click="applySearch"
            >
              Search
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
    </b-row>
    <!------ SideBar with filters ------>
    <b-sidebar
      id="sidebar-filters"
      shadow
      bg-variant="white"
      backdrop
    >
      <!------ SideBar Header ------>
      <b-col class="p-2">
        <b-row class="mb-1 d-flex justify-content-between align-items-center">
          <h3>Filters</h3>
          <div>
            <b-button
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              size="sm"
              variant="primary"
              class="mr-1"
              @click="applyFilters"
            >
              Apply
            </b-button>
            <b-button
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              size="sm"
              variant="outline-secondary"
              class="mr-1"
              @click="clear"
            >
              Clear
            </b-button>
            <b-button
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              v-b-modal.modal-1
              size="sm"
              variant="outline-primary"
              class="btn-icon"
            >
              <feather-icon icon="Maximize2Icon" />
            </b-button>
          </div>
        </b-row>
        <b-row class="mb-1 d-flex justify-content-between align-items-center">
          <b-input-group size="sm">
            <b-input-group-prepend is-text>
              <feather-icon icon="SearchIcon" />
            </b-input-group-prepend>
            <b-form-input

              placeholder="Button on both side"
            />
            <b-input-group-append>
              <b-button
                variant="outline-primary"
              >
                Search
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-row>
      </b-col>
      <!------ SideBar Options ------>
      <b-col>
        <app-collapse type="default">
          <app-collapse-item title="Saved Filters">
            <b-form-radio-group
              v-model="value"
              :options="savedFilters"
              :state="state"
              class="d-flex flex-column"
              name="radio-validation"
            />
          </app-collapse-item>
          <app-collapse-item
            v-for="section, idx in schemasFilter"
            :key="idx"
            :title="section.section"
          >
            <!-- Separar componente -->
            <app-collapse type="margin">
              <app-collapse-item
                v-for="table, idx_table in section.tables"
                :key="idx_table"
                :title="table.table_name"
              >
                <b-form-group
                  v-for="item, idx_item in table.items"
                  :key="idx_item"
                  :label="item.name"
                  :label-for="item.name"
                >
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-dropdown
                        :text="item.operation?item.operation:'='"
                        variant="outline-primary"
                      >
                        <b-dropdown-item
                          v-for="action in filtersOption"
                          :key="action.operation"
                          @click="applyOperation(item,action.operation)"
                        >
                          {{ action.operation }}
                        </b-dropdown-item>

                      </b-dropdown>
                    </b-input-group-prepend>
                    <b-form-datepicker
                      v-if="item.type == 'date' || item.type == 'datetime'"
                      :id="item.name"
                      v-model="item.value"
                      :placeholder="item.name"
                    />
                    <b-form-input
                      v-else
                      :id="item.name"
                      v-model="item.value"
                      :placeholder="item.name"
                    />
                  </b-input-group>
                </b-form-group>
              </app-collapse-item>
            </app-collapse>
            <!-- Fin separa componente -->
          </app-collapse-item>
        </app-collapse>
      </b-col>
    </b-sidebar>
    <stack-modal-info />
    <!------ Modal with filters ------>
    <stack-filters :schemas-filter="schemasFilter" />
    <stack-table :filter="filter" />
  </b-card>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BSidebar,
  VBToggle,
  BButton,
  BFormGroup,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroupPrepend,
  BFormRadioGroup,
  BFormDatepicker,
  BDropdown,
  BDropdownItem,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
import services from '@/plugins/services/property-stack'
import StackTable from './components/StackTable.vue'
import StackFilters from './components/StackFilters.vue'
import StackModalInfo from './components/StackModalInfo.vue'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BSidebar,
    BButton,
    BFormGroup,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroupPrepend,
    BFormDatepicker,
    AppCollapse,
    AppCollapseItem,
    BFormRadioGroup,
    StackTable,
    StackFilters,
    StackModalInfo,
    BDropdown,
    BDropdownItem,
  },
  directives: {
    'b-toggle': VBToggle,
    Ripple,
  },
  data() {
    return {
      value: null,
      savedFilters: [],
      schemasFilter: [],
      filter: {},
      search: '',
      filtersOption: [
        { operation: '=' },
        { operation: '>' },
        { operation: '<' },
        { operation: '>=' },
        { operation: '<=' },
        { operation: '<>' },
        { operation: 'Like' },
        { operation: 'In' },
      ],
    }
  },
  computed: {
    state() {
      return Boolean(this.value)
    },
  },
  async mounted() {
    await this.getSchemas()
  },
  methods: {
    getSchemas() {
      services.getSchemas().then(res => {
        this.schemasFilter = res
      }).catch(error => {
        // eslint-disable-next-line no-console
        console.log(error)
      })
    },
    applyOperation(item, operation) {
      // eslint-disable-next-line no-param-reassign
      item.operation = operation
      this.schemasFilter = [...this.schemasFilter]
    },
    applySearch() {
      this.filter = {}
      if (this.search) {
        this.filter.property = {
          table_name: 'property',
          items: [
            {
              name: 'folio',
              value: this.search,
            },
          ],
        }
      }
    },
    applyFilters() {
      this.filter = {}
      this.schemasFilter.forEach(section => {
        section.tables.forEach(table => {
          let some = false
          this.filter[table.table_name] = { table_name: table.table_name, items: [] }
          table.items.forEach(item => {
            if (item.value) {
              some = true
              this.filter[table.table_name].items.push({ ...item })
            }
          })
          if (!some) {
            delete this.filter[table.table_name]
          }
        })
      })
    },
    clear() {
      this.filter = {}
    },
  },
}
</script>

<style>
  .listInModal{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    max-height: 70vh;
  }
</style>
