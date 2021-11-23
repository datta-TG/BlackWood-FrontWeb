<template>
  <b-form @submit.prevent>
    <b-row v-if="localData">
      <b-col
        v-for="field in coreFields"
        :key="field.key"
        cols="12"
      >
        <b-form-group
          v-if="!field.select && !field.date && !field.folio"
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
        <b-form-group
          v-else-if="field.folio"
          :label="field.label"
          :label-for="field.key"
        >
          <v-select
            :id="field.key"
            v-model="localData[field.key]"
            class="w-100 mb-2"
            placeholder="Folio"
            :filterable="false"
            :options="folioOptions"
            @search="onSearch"
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
    coreIndicatorConfig: {
      type: Object,
      default: () => {},
    },
    core: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      localData: null,
      folioOptions: [],
    }
  },
  computed: {
    coreFields() {
      return this.coreIndicatorConfig.fields.filter(item => item.update)
    },
  },
  watch: {
    core() {
      this.localData = { ...this.core }
    },
  },
  methods: {
    onSearch(search, loading) {
      if (search.length) {
        loading(true)
        this.getFolios(loading, search)
      }
    },
    getFolios(loading, search) {
      services.foliosMatch(search).then(res => {
        if (res.status === 200) {
          // eslint-disable-next-line no-param-reassign
          this.folioOptions = res.data.folios
        }
        loading(false)
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
      })
    },
    update() {
      const data = { ...this.localData }

      Object.keys(this.localData).forEach(key => {
        if (data[key] === '') {
          data[key] = null
        }
        if (this.coreIndicatorConfig.fields.find(item => item.key === key)?.date) {
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
