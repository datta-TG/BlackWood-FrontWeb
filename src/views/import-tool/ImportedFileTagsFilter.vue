<template>
  <b-card no-body>
    <b-card-header class="pb-50">
      <h5>
        Filter
      </h5>
    </b-card-header>
    <b-card-body>
      <b-row>
        <b-col
          cols="12"
          md="12"
          class="mb-md-0 mb-2"
        >
          <label>Tags</label>
          <v-select
            :value="tagsFilter"
            label="name"
            :options="tagsOptions"
            class="w-100"
            multiple
            :reduce="val => val.value"
            @input="(val) => $emit('update:tagsFilter', val)"
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
    tagsFilter: {
      type: [Array, null],
      default: null,
    },
    tagsOptions: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
