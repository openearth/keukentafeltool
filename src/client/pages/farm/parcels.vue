<template>
  <parcels-table :parcels="parcels" />
</template>

<script>
import { mapState } from 'vuex'

import { ParcelsTable } from '../../components'

export default {
  middleware: [ 'require-parcels' ],
  components: { ParcelsTable },
  computed: {
    ...mapState('parcels', ['parcels']),
  },
  mounted() {
    this.$store.dispatch('mapbox/removeOverlay', 'parcels-layer')
    this.$store.dispatch('mapbox/removeMapClickHandler', 'parcels-layer')
  }
}
</script>
