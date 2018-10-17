<template>
  <div>
    <md-button
      to="/farm"
      class="md-button"
      type="button"
    >
      Percelen selecteren <md-icon>arrow_left_alt</md-icon>
    </md-button>
    <parcels-table :parcels="features" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import initMapState from '../../lib/mixins/init-map-state'
import layerFactory from '../../lib/_mapbox/layer-factory'
import parcelColors from '../../lib/_mapbox/parcel-colors'

import { ParcelsTable } from '../../components'

export default {
  middleware: [ 'require-parcels' ],
  components: { ParcelsTable },
  mixins: [ initMapState ],
  data() {
    return {
      contentOpen: false
    }
  },
  computed: {
    ...mapState('mapbox', [ 'mapIsLoaded' ]),
    ...mapState('mapbox/features', [ 'features' ]),
    toggleIcon() { return this.contentOpen ? '<' : '>' }
  },
  methods: {
    initMapState() {
      const overlay = layerFactory.parcels()
      this.$store.dispatch('mapbox/removeEventHandler', { event: 'click' })
      this.$store.dispatch('mapbox/overlays/add', overlay)
      this.$store.dispatch('mapbox/overlays/setOpacity', { id: overlay.id, opacity: 0.3 })
      this.features.forEach(feature => {
        this.$store.dispatch('mapbox/features/add', feature)
        this.$store.dispatch('mapbox/features/setStyle', {
          id: feature.id,
          styleOption: 'fill-color',
          value: parcelColors(feature.properties.gewascategorie)
        })
        this.$store.dispatch('mapbox/features/setStyle', {
          id: feature.id,
          styleOption: 'fill-opacity',
          value: 1
        })
      })
    },
  }
}
</script>
