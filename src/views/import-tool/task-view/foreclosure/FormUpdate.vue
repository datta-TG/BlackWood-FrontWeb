<template>
  <b-form @submit.prevent>
    <b-row>
      <b-col
        v-for="field in foreclosureFields"
        :key="field.key"
        cols="12"
      >
        <b-form-group
          v-if="!field.select"
          :label="field.label"
          :label-for="field.key"
        >
          <b-form-input
            :id="field.key"
            :value="localData[field.key]"
            :placeholder="field.label"
          />
        </b-form-group>
        <b-form-group
          v-else
          :label="field.label"
          :label-for="field.key"
        >
          <v-select
            label="label"
            :reduce="val => val.value"
            class="w-100"
            :placeholder="field.label"
            :options="field.options"
            :value="localData[field.key]"
          />
        </b-form-group>
      </b-col>

      <!-- submit  -->
      <b-col cols="12">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          type="submit"
          variant="primary"
          class="mr-1"
        >
          Submit
        </b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BButton,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import foreclosureData from '@/views/import-tool/task-view/foreclosure'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BButton,
    vSelect,
  },
  directives: {
    Ripple,
  },
  props: {
    fields: {
      type: [Array, null],
      default: null,
    },
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      localData: {},
    }
  },
  computed: {
    foreclosureFields() {
      return foreclosureData.filter(item => item.update)
    },
  },
  watch: {
    data() {
      this.localData = this.data
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
