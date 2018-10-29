<template>
  <div>
    <md-toolbar
      md-elevation="0"
      class="md-dense"
    />
    <nutrients-table :nutrients="features" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import requireFeatures from '../../lib/mixins/require-features'
import { NutrientsTable } from '../../components'


export default {
  components: { NutrientsTable },
  mixins: [ requireFeatures ],
  middleware: [ 'require-parcels' ],
    computed: {
    ...mapState('mapbox/features', [ 'features' ])
  }
}
</script>
