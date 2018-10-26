<template>
  <div>
    <md-toolbar
      md-elevation="0"
      class="md-dense"
    >
      <div class="md-toolbar-section-end">
        <md-button to="/farm/">wijzig percelen</md-button>
      </div>
    </md-toolbar>
    <no-ssr>
      <parcels-table
        :parcels="features"
        @updateProperty="updateProperty"
      />
    </no-ssr>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import initMapState from '../../lib/mixins/init-map-state'
import requireFeatures from '../../lib/mixins/require-features'
import layerFactory from '../../lib/_mapbox/layer-factory'
import parcelColors from '../../lib/_mapbox/parcel-colors'

import { ParcelsTable } from '../../components'

export default {
  components: { ParcelsTable },
  mixins: [
    initMapState,
    requireFeatures
  ],
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
      this.$emit('fitFeatures')
    },
    updateProperty (parcelProperty) {
      this.$store.commit('mapbox/features/updateParcelProperty', parcelProperty)
    }
  }
}
</script>
