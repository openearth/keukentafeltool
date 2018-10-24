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

import { NutrientsTable } from '../../components'

export default {
  components: { NutrientsTable },
  middleware: [ 'require-parcels' ],
    computed: {
    ...mapState('mapbox/features', [ 'features' ])
  },
}
</script>
