<template>
  <input-panel :parcels="parcels" />
</template>

<script>
import { mapState } from 'vuex'
import { InputPanel } from '../components'

export default {
  components: { InputPanel },
  computed: {
    ...mapState('parcels', ['parcels']),
  },
}
</script>

<style>
  .input-panel {
    width: 480px;
  }
</style>
