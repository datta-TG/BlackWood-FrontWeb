<template>
  <b-row>
    <b-col
      cols="12"
      md="12"
      class="md-0 mb-2"
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
</template>

<script>
import {
  BRow, BCol,
} from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  components: {
    BRow,
    BCol,
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
