<template>
  <div class="scroll-area">
    <md-toolbar
      md-elevation="0"
      class="md-dense"
    />
    <nutrients-table :parcels="features" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import initMapState from '../../lib/mixins/init-map-state'
import requireFeatures from '../../lib/mixins/require-features'
import { NutrientsTable } from '../../components'


export default {
  components: { NutrientsTable },
  mixins: [
    initMapState,
    requireFeatures,
  ],
  computed: {
    ...mapState('mapbox/features', [ 'features' ])
  },
  methods: {
    initMapState() {
      this.$emit('fitFeatures')
    },
  }
}
</script>

