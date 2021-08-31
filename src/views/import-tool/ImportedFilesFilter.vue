<template>
  <b-card no-body>
    <b-card-header class="pb-50">
      <h5>
        Filters
      </h5>
    </b-card-header>
    <b-card-body>
      <b-row>
        <b-col
          cols="12"
          md="6"
          class="mb-md-0 mb-2"
        >
          <label>County</label>
          <v-select
            :value="countyFilter"
            label="name"
            :options="countyOptions"
            class="w-100"
            multiple
            :reduce="val => val.id"
            @input="(val) => $emit('update:countyFilter', val)"
          />
        </b-col>
        <b-col
          cols="12"
          md="6"
          class="mb-md-0 mb-2"
        >
          <label>File Type</label>
          <v-select
            :value="fileTypeFilter"
            label="name"
            :options="fileTypeOptions"
            class="w-100"
            multiple
            :reduce="val => val.id"
            @input="(val) => $emit('update:fileTypeFilter', val)"
          />
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardBody, BRow, BCol,
} from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardBody,
    vSelect,
  },
  props: {
    countyFilter: {
      type: [Array, null],
      default: null,
    },
    fileTypeFilter: {
      type: [Array, null],
      default: null,
    },
    countyOptions: {
      type: Array,
      required: true,
    },
    fileTypeOptions: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
