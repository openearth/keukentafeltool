<template>
  <footer-bar>
    <div class="footer-bar__align footer-bar__align--center">
      <template v-if="parcelCount === 0">Selecteer percelen</template>
      <template v-else-if="parcelCount === 1">1 perceel geselecteerd</template>
      <template v-else>{{ parcelCount }} percelen geselecteerd</template>
      <md-button
        :disabled="parcelCount === 0"
        to="/farm/parcels/"
        type="button"
        class="md-dense md-raised md-primary"
      >
        Volgende <md-icon aria-hidden="true">navigate_next</md-icon>
      </md-button>
    </div>
  </footer-bar>
</template>

<script>
import { mapState } from 'vuex'

import getFeatureInfo from '../../lib/get-feature-info'
import initMapState from '../../lib/mixins/init-map-state'
import layerFactory from '../../lib/_mapbox/layer-factory'
import parcelColors from '../../lib/_mapbox/parcel-colors'
import unbindMapHandlers from '../../lib/mixins/unbind-map-handlers'

import { FooterBar } from '../../components'

export default {
  components: { FooterBar },
  mixins: [ initMapState, unbindMapHandlers ],
  computed: {
    ...mapState('mapbox', [ 'mapObject', 'mapIsLoaded' ]),
    ...mapState('mapbox/features', [ 'features' ]),
    parcelCount() { return this.features.length },
  },
  methods: {
    initMapState() {
      this.$store.dispatch('mapbox/addEventHandler', { event: 'click', handler: (event) => this.mapClickHandler(event) })

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
      this.$emit('fitFeatures')
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
