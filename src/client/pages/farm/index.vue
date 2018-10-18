<template>
  <footer-bar>
    <template v-if="parcelCount === 0">Selecteer percelen</template>
    <template v-else-if="parcelCount === 1">1 perceel geselecteerd</template>
    <template v-else>{{ parcelCount }} percelen geselecteerd</template>
    <md-button
      :disabled="parcelCount === 0"
      to="/farm/parcels"
      type="button"
      class="md-raised md-primary"
    >
      Volgende <md-icon>arrow_right_alt</md-icon>
    </md-button>
  </footer-bar>
</template>

<script>
import { mapState } from 'vuex'

import getFeatureInfo from '../../lib/get-feature-info'
import initMapState from '../../lib/mixins/init-map-state'
import layerFactory from '../../lib/_mapbox/layer-factory'
import parcelColors from '../../lib/_mapbox/parcel-colors'

import { FooterBar } from '../../components'

export default {
  components: { FooterBar },
  mixins: [ initMapState ],
  computed: {
    ...mapState('mapbox', [ 'mapObject', 'mapIsLoaded' ]),
    ...mapState('mapbox/features', [ 'features' ]),
    parcelCount() { return this.features.length },
  },
  methods: {
    initMapState() {
      const overlay = layerFactory.parcels()
      this.$store.dispatch('mapbox/addEventHandler', { event: 'click', handler: (event) => this.mapClickHandler(event) })
      this.$store.dispatch('mapbox/overlays/add', overlay)
      this.$store.dispatch('mapbox/overlays/setOpacity', { id: overlay.id, opacity: 1 })
      this.features.forEach(feature => {
        this.$store.dispatch('mapbox/features/add', feature)
        this.$store.dispatch('mapbox/features/setStyle', {
          id: feature.id,
          styleOption: 'fill-color',
          value: parcelColors()
        })
        this.$store.dispatch('mapbox/features/setStyle', {
          id: feature.id,
          styleOption: 'fill-opacity',
          value: 0.7
        })
      })
      this.$store.dispatch('mapbox/addOnceEventHandler', {
        event: 'resize',
        handler: () => { this.$store.dispatch('mapbox/features/flyToFirstFeature') }
      })
    },
    mapClickHandler({ point, target }) {
      const canvas = target.getCanvas()
      const { _ne, _sw } = target.getBounds()
      const { x, y } = point

      getFeatureInfo({
        layer: 'percelen:brp_gewaspercelen_2017_concept',
        ne: _ne,
        sw: _sw,
        width: canvas.offsetWidth,
        height: canvas.offsetHeight,
        x,
        y,
      })
        .then(feature => {
          if(!feature) {
            return
          }

          if(target.getLayer(feature.id)) {
            this.$store.dispatch('mapbox/features/remove', feature.id)
          } else {
            this.$store.dispatch('mapbox/features/add', feature)
          }
        })
    }
  },
}
</script>
