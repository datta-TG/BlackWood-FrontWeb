<template>
  <b-card class="p-1">
    <!------ Header ------>
    <b-row class="mb-1 d-flex justify-content-between align-items-center">
      <b-button
        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
        v-b-toggle.sidebar-filters
        variant="primary"
        class="btn-icon mb-2"
      >
        <feather-icon icon="FilterIcon" />
        Filters
      </b-button>
      <b-col
        lg="6"
        class="mb-2"
      >
        <b-input-group>
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
            >
              Aply
            </b-button>
            <b-button
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              size="sm"
              variant="outline-secondary"
              class="mr-1"
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
            <b-form-input placeholder="Button on both side" />
            <b-input-group-append>
              <b-button variant="outline-primary">
                Search
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-row>
      </b-col>
      <!------ SideBar Options ------>
      <b-col>
        <app-collapse type="margin">
          <app-collapse-item title="Saved Filters">
            <b-form-radio-group
              v-model="value"
              :options="savedFilters"
              :state="state"
              class="d-flex flex-column"
              name="radio-validation"
            />
          </app-collapse-item>
          <app-collapse-item title="Indicators">
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="selected"
              :options="indicators"
              name="indicators"
              class="d-flex flex-column"
            />
          </app-collapse-item>
          <app-collapse-item title="Indicators2">
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="selected"
              :options="indicators"
              name="indicators"
              class="d-flex flex-column"
            />
          </app-collapse-item>
          <app-collapse-item title="Indicators3">
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="selected"
              :options="indicators"
              name="indicators"
              class="d-flex flex-column"
            />
          </app-collapse-item>
          <app-collapse-item title="Indicators4">
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="selected"
              :options="indicators"
              name="indicators"
              class="d-flex flex-column"
            />
          </app-collapse-item>
        </app-collapse>
      </b-col>
    </b-sidebar>
    <!------ Modal with filters ------>
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
              Aply
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
      <app-collapse type="margin">
        <div class="listInModal">
          <app-collapse-item
            title="Saved Filters"
            class=" mr-1"
          >
            <b-form-radio-group
              v-model="value"
              :options="savedFilters"
              :state="state"
              class="d-flex flex-column"
              name="radio-validation"
            />
          </app-collapse-item>
          <app-collapse-item
            title="Indicators"
            class=" mr-1"
          >
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="selected"
              :options="indicators"
              name="indicators"
              class="d-flex flex-column"
            />
          </app-collapse-item>
          <app-collapse-item
            title="Indicators2"
            class=" mr-1"
          >
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="selected"
              :options="indicators"
              name="indicators"
              class="d-flex flex-column"
            />
          </app-collapse-item>
          <app-collapse-item
            title="Indicators3"
            class=" mr-1"
          >
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="selected"
              :options="indicators"
              name="indicators"
              class="d-flex flex-column"
            />
          </app-collapse-item>
          <app-collapse-item
            title="Indicators4"
            class=" mr-1"
          >
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="selected"
              :options="indicators"
              name="indicators"
              class="d-flex flex-column"
            />
          </app-collapse-item>
          <app-collapse-item
            title="Saved Filters"
            class=" mr-1"
          >
            <b-form-radio-group
              v-model="value"
              :options="savedFilters"
              :state="state"
              class="d-flex flex-column"
              name="radio-validation"
            />
          </app-collapse-item>
          <app-collapse-item
            title="Indicators"
            class=" mr-1"
          >
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="selected"
              :options="indicators"
              name="indicators"
              class="d-flex flex-column"
            />
          </app-collapse-item>
          <app-collapse-item
            title="Indicators2"
            class=" mr-1"
          >
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="selected"
              :options="indicators"
              name="indicators"
              class="d-flex flex-column"
            />
          </app-collapse-item>
          <app-collapse-item
            title="Indicators3"
            class=" mr-1"
          >
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="selected"
              :options="indicators"
              name="indicators"
              class="d-flex flex-column"
            />
          </app-collapse-item>
          <app-collapse-item
            title="Indicators4"
            class=" mr-1"
          >
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="selected"
              :options="indicators"
              name="indicators"
              class="d-flex flex-column"
            />
          </app-collapse-item>
          <app-collapse-item
            title="Saved Filters"
            class=" mr-1"
          >
            <b-form-radio-group
              v-model="value"
              :options="savedFilters"
              :state="state"
              class="d-flex flex-column"
              name="radio-validation"
            />
          </app-collapse-item>
          <app-collapse-item
            title="Indicators"
            class=" mr-1"
          >
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="selected"
              :options="indicators"
              name="indicators"
              class="d-flex flex-column"
            />
          </app-collapse-item>
          <app-collapse-item
            title="Indicators2"
            class=" mr-1"
          >
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="selected"
              :options="indicators"
              name="indicators"
              class="d-flex flex-column"
            />
          </app-collapse-item>
          <app-collapse-item
            title="Indicators3"
            class=" mr-1"
          >
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="selected"
              :options="indicators"
              name="indicators"
              class="d-flex flex-column"
            />
          </app-collapse-item>
          <app-collapse-item
            title="Indicators4"
            class=" mr-1"
          >
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="selected"
              :options="indicators"
              name="indicators"
              class="d-flex flex-column"
            />
          </app-collapse-item>
        </div>
      </app-collapse>
    </b-modal>
    <b-col>
      <b-table
        :items="data"
      />
    </b-col>
  </b-card>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BTable,
  BSidebar,
  VBToggle,
  BButton,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroupPrepend,
  BFormRadioGroup,
  BFormCheckboxGroup,
  BModal,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
import datas from './data'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BSidebar,
    BButton,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroupPrepend,
    AppCollapse,
    AppCollapseItem,
    BTable,
    BFormRadioGroup,
    BFormCheckboxGroup,
    BModal,
  },
  directives: {
    'b-toggle': VBToggle,
    Ripple,
  },
  data() {
    return {
      value: null,
      savedFilters: [
        { text: 'Filter 1', value: 'first' },
        { text: 'Filter 2', value: 'second' },
        { text: 'Filter 3', value: 'third' },
      ],
      indicators: [
        { text: 'Indicator 1', value: 'first' },
        { text: 'Indicator 2', value: 'second' },
        { text: 'Indicator 3', value: 'third' },
      ],
      data: datas,
    }
  },
  computed: {
    state() {
      return Boolean(this.value)
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
