<template>
  <core-indicator
    :core-indicator-data="taxAuction"
    core-indicator="tax_auction"
  />
</template>

<script>
import taxAuction from '@/views/import-tool/task-view/tax-auction'
import CoreIndicator from '@/views/import-tool/task-view/CoreIndicator.vue'

export default {
  components: {
    CoreIndicator,
  },
  data() {
    return {
      taxAuction,
    }
  },
}
</script>
