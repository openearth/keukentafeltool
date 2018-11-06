<template>
  <div class="farm-page__panel-content">
    <no-ssr>
      <measures-list
        :measures="measures"
        :parcels-per-measure="parcelsPerMeasure"
        @selectMeasure="selectMeasure"
        @removeSelectedParcel="unassignMeasure"
      />
    </no-ssr>
    <portal
      to="footer-bar"
    >
      <div class="footer-bar">
        <md-button
          type="button"
          to="/farm/parcels/"
        >
          <md-icon aria-hidden="true">navigate_before</md-icon> Percelen
        </md-button>
        <md-button
          type="button"
          class="md-raised md-primary"
          to="/farm/nutrients/"
        >
          Bekijk effect <md-icon aria-hidden="true">navigate_next</md-icon>
        </md-button>
      </div>
    </portal>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import initMapState from '../../lib/mixins/init-map-state'
import layerFactory from '../../lib/_mapbox/layer-factory'
import parcelColors from '../../lib/_mapbox/parcel-colors'
import requireFeatures from '../../lib/mixins/require-features'
import unbindFeatureHandlers from '../../lib/mixins/unbind-feature-handlers'

import { MeasuresList } from '../../components'
import { FooterBar } from '../../components'

export default {
  components: { MeasuresList, FooterBar },
  mixins: [
    initMapState,
    requireFeatures,
    unbindFeatureHandlers
  ],
  data() {
    return {
      selectedMeasure: undefined,
    }
  },
  computed: {
    ...mapState('mapbox/features', ['features']),
    ...mapState('measures', ['parcelsPerMeasure', 'measures']),
    ...mapGetters('measures', [ 'measuresPerParcel' ])
  },
  methods: {
    initMapState() {
      const overlay = layerFactory.parcels()
      this.$store.dispatch('mapbox/overlays/add', overlay)
      this.$store.dispatch('mapbox/overlays/setOpacity', { id: overlay.id, opacity: 0.3 })

      this.features.forEach((feature, index) => {
        this.$store.dispatch('mapbox/features/add', feature)
        this.$store.dispatch('mapbox/features/addEventHandler', {
          id: feature.id,
          event: 'click',
          handler: (event) => this.selectParcel({ event, index, id: feature.id })
        })
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
    setFeatureFill({ id, color }) {
      this.$store.dispatch('mapbox/features/setStyle', {
        id,
        styleOption: 'fill-color',
        value: color
      })
    },
    selectMeasure(measure) {
      if(this.selectedMeasure) {
        const assignedFeatureIds = this.parcelsPerMeasure[this.selectedMeasure.id] || []

        assignedFeatureIds.forEach(assignedId => {
          const feature = this.features.find(feature => feature.id === assignedId)
          this.setFeatureFill({ id: assignedId, color: parcelColors(feature.properties.gewascategorie) })
        })
      }

      if(measure) {
        const nextAssignedFeatureIds = this.parcelsPerMeasure[measure.id] || []

        nextAssignedFeatureIds.forEach(id => {
          this.setFeatureFill({ id, color: parcelColors() })
        })
      }

      this.selectedMeasure = measure
    },
    selectParcel({ event, index, id }) {
      if(this.selectedMeasure && this.selectedMeasure.id) {
        const parcels = this.parcelsPerMeasure[this.selectedMeasure.id]

        if(!parcels || !parcels.includes(id)) {
          this.assignMeasure({ id, measure: this.selectedMeasure })
        } else {
          this.unassignMeasure({ id, measure: this.selectedMeasure })
        }

      }
    },
    assignMeasure({ id, measure }) {
      this.$store.commit('measures/assignMeasure', { parcelId: id, measure })
      this.setFeatureFill({ id, color: parcelColors() })
    },
    unassignMeasure({ id, measure }) {
      const feature = this.features.find(feature => feature.id === id)

      this.$store.commit('measures/unassignMeasure', { parcelId: id, measure })
      this.setFeatureFill({ id, color: parcelColors(feature.properties.gewascategorie) })
    }
  }
}
</script>
