<template>
  <core-indicator
    :core-indicator-data="delinquency"
    core-indicator="delinquency"
  />
</template>

<script>
import delinquency from '@/views/import-tool/task-view/delinquency'
import CoreIndicator from '@/views/import-tool/task-view/CoreIndicator.vue'

export default {
  components: {
    CoreIndicator,
  },
  data() {
    return {
      delinquency,
    }
  },
}
</script>
