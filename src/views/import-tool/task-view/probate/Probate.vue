<template>
  <core-indicator
    :core-indicator-data="probate"
    core-indicator="probate"
  />
</template>

<script>
import probate from '@/views/import-tool/task-view/probate'
import CoreIndicator from '@/views/import-tool/task-view/CoreIndicator.vue'

export default {
  components: {
    CoreIndicator,
  },
  data() {
    return {
      probate,
    }
  },
}
</script>
