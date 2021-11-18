<template>
  <div>
    <div class="px-2 py-2 border-bottom">
      <b-row class="mb-1">
        <b-col>
          <h4>Database Settings</h4>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            size="sm"
            variant="success"
            class="w-100"
            @click="startDatabase"
          >
            Start Database
          </b-button>
        </b-col>
        <b-col cols="6">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            size="sm"
            variant="danger"
            class="w-100"
            @click="stopDatabase"
          >
            Stop Database
          </b-button>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import {
  BRow, BCol, BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import services from '@/plugins/services/blackwood'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BRow,
    BCol,
    BButton,
  },
  directives: {
    Ripple,
  },
  methods: {
    startDatabase() {
      services.startDatabase().then(response => {
        if (response.status === 200) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Complete',
              icon: 'BellIcon',
              text: response.data.message === '' ? 'Database Starting Successfully. 🟢' : response.data.message,
              variant: 'success',
            },
          })
        }
      })
    },
    stopDatabase() {
      services.stopDatabase().then(response => {
        if (response.status === 200) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Complete',
              icon: 'BellIcon',
              text: response.data.message === '' ? 'Database Stoping Successfully. 🔴' : response.data.message,
              variant: 'success',
            },
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
