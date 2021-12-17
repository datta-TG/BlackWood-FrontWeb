<template>
  <b-card title="Import Data">
    <b-card-text class="mb-0">
      Click on Import button below to start the property master import process from Dropbox to database, please be sure that all required files are ready to import. 😄
    </b-card-text>

    <div class="demo-inline-spacing">
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="primary"
      >
        Import Now
      </b-button>
    </div>
  </b-card>
</template>

<script>
import { BButton, BCard, BCardText } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BButton,
    BCardText,
    BCard,
  },
  directives: {
    Ripple,
  },
}
</script>
