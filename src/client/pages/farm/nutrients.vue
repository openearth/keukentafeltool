<template>
  <div>
    <md-toolbar
      md-elevation="0"
      class="md-dense"
    />
    <nutrients-table :parcels="features" />
    <outcome-table />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import requireFeatures from '../../lib/mixins/require-features'
import { NutrientsTable } from '../../components'
import { OutcomeTable } from '../../components'



export default {
  components: { NutrientsTable, OutcomeTable },
  mixins: [ requireFeatures ],
  computed: {
    ...mapState('mapbox/features', [ 'features' ])
  }
}
</script>
