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
    <app-collapse type="margin">
      <div class="listInModal">
        <app-collapse-item
          title="Saved Filters"
          class="mr-1"
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
          class="mr-1"
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
          class="mr-1"
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
          class="mr-1"
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
          class="mr-1"
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
          class="mr-1"
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
          class="mr-1"
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
          class="mr-1"
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
          class="mr-1"
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
          class="mr-1"
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
          class="mr-1"
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
          class="mr-1"
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
          class="mr-1"
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
          class="mr-1"
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
          class="mr-1"
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
  BFormRadioGroup,
  BFormCheckboxGroup,
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
    }
  },
  computed: {
    state() {
      return Boolean(this.value)
    },
  },
}
</script>
