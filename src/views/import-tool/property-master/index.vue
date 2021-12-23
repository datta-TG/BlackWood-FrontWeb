<template>
  <b-card title="Import Data">
    <b-card-text class="mb-0">
      Click on Import button below to start the property master import process from Dropbox to database, please be sure that all required files are ready to import. 😄
    </b-card-text>

    <div class="demo-inline-spacing">
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="primary"
        @click="importMaster"
      >
        Import Now
      </b-button>
    </div>
  </b-card>
</template>

<script>
import { BButton, BCard, BCardText } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import services from '@/plugins/services/property-master'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BButton,
    BCardText,
    BCard,
  },
  directives: {
    Ripple,
  },
  methods: {
    importMaster() {
      if (localStorage.getItem('latestImportMaster') === null) {
        const currentDate = Date.now()
        localStorage.setItem('latestImportMaster', currentDate)
      } else {
        const latestImportMaster = localStorage.getItem('latestImportMaster')
        const currentDate = Date.now()
        const diff = Math.abs(latestImportMaster - currentDate) / 3600000
        if (diff < 4) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Bussy',
              icon: 'BellIcon',
              text: 'We are working in another property master, please wait',
              variant: 'danger',
            },
          })
          return
        }
        localStorage.setItem('latestImportMaster', currentDate)
      }
      services.importMaster().then(res => {
        if (res.status === 200) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Success',
              icon: 'BellIcon',
              text: res.data.message,
              variant: 'success',
            },
          })
        }
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
  },
}
</script>
