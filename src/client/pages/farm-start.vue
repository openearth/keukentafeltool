<template>
  <div>
    <input-panel
      :parcels="parcels"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { InputPanel } from '../components'

export default {
  components: {
    InputPanel
  },
  computed: {
    ...mapState('parcels', [
      'parcels'
    ])
  },
}
</script>

<style>
  .input-panel {
    width: 400px;
  }
</style>
