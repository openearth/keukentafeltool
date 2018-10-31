<template>
  <div>
    <md-toolbar
      md-elevation="0"
      class="md-dense"
    />
    <nutrients-table :parcels="features" />
    <nutrients-totals />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import initMapState from '../../lib/mixins/init-map-state'
import requireFeatures from '../../lib/mixins/require-features'
import { NutrientsTable, NutrientsTotals } from '../../components'

export default {
  components: { NutrientsTable, NutrientsTotals },
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
