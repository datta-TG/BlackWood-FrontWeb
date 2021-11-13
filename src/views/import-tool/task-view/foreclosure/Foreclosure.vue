<template>
  <core-indicator
    :core-indicator-data="foreclosure"
    core-indicator="foreclosure"
  />
</template>

<script>
import foreclosure from '@/views/import-tool/task-view/foreclosure'
import CoreIndicator from '@/views/import-tool/task-view/CoreIndicator.vue'

export default {
  components: {
    CoreIndicator,
  },
  data() {
    return {
      foreclosure,
    }
  },
}
</script>
