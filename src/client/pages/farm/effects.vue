<template>
  <div class="farm-page__panel-content">
    <effects-table
      :parcels="features"
      :effects="totalEffectsPerParcel"
    />
    <effects-totals
      :parcels="features"
      :effects="effects"
    />
    <portal
      to="footer-bar"
    >
      <div class="footer-bar">
        <div class="footer-bar__align footer-bar__align--space-between">
          <md-button
            type="button"
            to="/farm/measures/"
            class="md-dense"
          >
            <md-icon aria-hidden="true">navigate_before</md-icon> wijzig maatregelen
          </md-button>
          <md-button
            type="button"
            class="md-dense md-raised md-primary"
            to="#"
          >
            <md-icon aria-hidden="true">description</md-icon> Rapport
          </md-button>
        </div>
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

import { effectsTable, effectsTotals } from '../../components'

export default {
  components: { effectsTable, effectsTotals },
  mixins: [
    initMapState,
    requireFeatures,
  ],
  data() {
    return {
      effects: [],
    }
  },
  computed: {
    ...mapState('mapbox/features', [ 'features' ]),
    ...mapGetters('effects', [ 'totalEffectsPerParcel' ]),
    ...mapGetters('measures', [ 'measuresPerParcel' ]),
  },
  beforeMount () {
    const { measuresPerParcel } = this
    const input = Object.keys(measuresPerParcel).map(parcelId => {
      return {
        parcelId,
        measureIds: measuresPerParcel[parcelId],
      }
    })

    this.$store.dispatch('effects/getEffects', input)
  },
  methods: {
    initMapState() {
      const overlay = layerFactory.parcels()
      this.$store.dispatch('mapbox/overlays/add', overlay)
      this.$store.dispatch('mapbox/overlays/setOpacity', { id: overlay.id, opacity: 0.3 })

      this.features.forEach((feature, index) => {
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
  }
}
</script>

