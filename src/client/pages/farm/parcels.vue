<template>
  <div class="farm-page__panel-content">
    <no-ssr>
      <parcels-table
        :parcels="features"
        @updateProperty="updateProperty"
      />
    </no-ssr>
    <portal
      to="footer-bar"
    >
      <div class="footer-bar">
        <div class="footer-bar__align footer-bar__align--space-between">
          <md-button
            type="button"
            to="/farm/"
            class="md-dense"
          >
            <md-icon aria-hidden="true">navigate_before</md-icon> wijzig percelen
          </md-button>
          <md-button
            type="button"
            class="md-dense md-raised md-primary"
            to="/farm/measures/"
          >
            Maatregelen <md-icon aria-hidden="true">navigate_next</md-icon>
          </md-button>
        </div>
      </div>
    </portal>
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
