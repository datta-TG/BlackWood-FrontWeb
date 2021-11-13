<template>
  <b-form @submit.prevent>
    <b-row v-if="localData">
      <b-col
        v-for="field in coreFields"
        :key="field.key"
        cols="12"
      >
        <b-form-group
          v-if="!field.select && !field.date"
          :label="field.label"
          :label-for="field.key"
        >
          <b-form-input
            :id="field.key"
            v-model="localData[field.key]"
            :placeholder="field.label"
          />
        </b-form-group>
        <b-form-group
          v-else-if="field.select"
          :label="field.label"
          :label-for="field.key"
        >
          <v-select
            v-model="localData[field.key]"
            label="label"
            :reduce="val => val.value"
            class="w-100"
            :placeholder="field.label"
            :options="field.options"
          />
        </b-form-group>
        <b-form-group
          v-else-if="field.date"
          :label="field.label"
          :label-for="field.key"
        >
          <b-form-datepicker
            :id="field.key"
            v-model="localData[field.key]"
            class="mb-2"
          />
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group
          label="Tag"
          label-for="tag"
        >
          <v-select
            v-model="localData.tag"
            label="value"
            :reduce="val => val.value"
            class="w-100"
            placeholder="Tags"
            :options="tagsOptions"
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
          @click="update"
        >
          Submit
        </b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BButton, BFormDatepicker,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'

import services from '@/plugins/services/import-tool'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormDatepicker,
    BForm,
    BButton,
    vSelect,
  },
  directives: {
    Ripple,
  },
  props: {
    coreIndicator: {
      type: String,
      default: '',
    },
    fields: {
      type: [Array, null],
      default: () => [],
    },
    core: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      localData: null,
      tagsOptions: [],
    }
  },
  computed: {
    coreFields() {
      return this.fields.filter(item => item.update)
    },
  },
  watch: {
    core() {
      this.localData = { ...this.core }
    },
  },
  async mounted() {
    await this.getTags()
  },
  methods: {
    getTags() {
      services.getTaskViewTags().then(res => {
        if (res.status === 200) {
          this.tagsOptions = res.data.tags.map(tag => ({
            value: tag,
          }))
        }
      })
    },
    update() {
      const data = { ...this.localData }

      Object.keys(this.localData).forEach(key => {
        if (data[key] === '') {
          data[key] = null
        }
        if (this.fields.find(item => item.key === key)?.date) {
          data[key] = new Date(data[key])
        }
      })
      this.$swal({
        title: 'Are you sure?',
        text: 'You will update the data!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-primary ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          services.updateCoreIndicator(this.coreIndicator, data)
            .then(() => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Complete',
                  icon: 'BellIcon',
                  text: 'Updated Finished Successfully. ⭐️',
                  variant: 'success',
                },
              })
              this.$emit('close')
              this.$emit('reload')
            })
        }
      })
    },
  },

}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
