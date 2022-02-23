<template>
  <b-modal
    id="modal-1"
    size="xl"
    class="filtersModal"
    hide-footer
  >
    <b-col class="p-2">
      <b-row class="mb-1 d-flex justify-content-between align-items-center">
        <h3>Filters</h3>
        <div>
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            size="sm"
            variant="primary"
            class="mr-1"
          >
            Apply
          </b-button>
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            size="sm"
            variant="outline-secondary"
            class="mr-1"
          >
            Clear
          </b-button>
        </div>
      </b-row>
      <b-row class="mb-1 d-flex justify-content-between align-items-center">
        <b-input-group size="sm">
          <b-input-group-prepend is-text>
            <feather-icon icon="SearchIcon" />
          </b-input-group-prepend>
          <b-form-input placeholder="Button on both side" />
          <b-input-group-append>
            <b-button variant="outline-primary">
              Search
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-row>
    </b-col>
    <app-collapse type="default">
      <b-row>
        <b-col
          sm="6"
          class="mb-2"
        >
          <app-collapse-item
            title="Saved Filters"
          >
            <div />
          </app-collapse-item>
        </b-col>
        <b-col
          v-for="section, idx in schemasFilter"
          :key="idx"
          sm="6"
          class="mb-2"
        >
          <app-collapse-item

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
                  <b-form-datepicker
                    v-if="item.type == 'date' || item.type == 'datetime'"
                    :id="item.name"
                  />
                  <b-form-input
                    v-else
                    :id="item.name"
                    :placeholder="item.name"
                  />
                </b-form-group>
              </app-collapse-item>
            </app-collapse>
            <!-- Fin separa componente -->
          </app-collapse-item>
        </b-col>
      </b-row>
    </app-collapse>
  </b-modal>
</template>
<script>
import {
  BRow,
  BCol,
  VBToggle,
  BButton,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroupPrepend,
  BModal,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'

export default {
  components: {
    BRow,
    BCol,
    BButton,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroupPrepend,
    AppCollapse,
    AppCollapseItem,
    BModal,
  },
  directives: {
    'b-toggle': VBToggle,
    Ripple,
  },
  props: {
    schemasFilter: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      value: null,
    }
  },
  computed: {
    state() {
      return Boolean(this.value)
    },
  },
}
</script>
