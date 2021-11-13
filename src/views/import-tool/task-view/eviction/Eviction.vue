<template>
  <core-indicator
    :core-indicator-data="eviction"
    core-indicator="eviction"
  />
</template>

<script>
import eviction from '@/views/import-tool/task-view/eviction'
import CoreIndicator from '@/views/import-tool/task-view/CoreIndicator.vue'

export default {
  components: {
    CoreIndicator,
  },
  data() {
    return {
      eviction,
    }
  },
}
</script>
