<template>
  <div
    ref="mapboxMap"
    class="mapbox-map"
  />
</template>

<script>
import mapFactory from '~/lib/_mapbox/map-factory'
import layerFactory from '~/lib/_mapbox/layer-factory'

export default {
  props: {
    listenersTransformFunction: {
      type: Function,
      required: false,
      default: undefined
    }
  },
  async mounted() {
    const map = mapFactory(this.$refs.mapboxMap)

    map.on('load', () => {
      map.addLayer(layerFactory.parcels())
    })

    this.setupListeners(map)
  },
  methods: {
    setupListeners(map) {
      if(this.listenersTransformFunction) {
        this.listenersTransformFunction(this.$listeners, map)
      } else {
        Object.keys(this.$listeners)
          .forEach(key => map.on(key.replace('_', '/'), this.$listeners[key]))
      }

    }
  }
}
</script>

<style>
  .mapbox-map {
    width: 100%;
    height: 100%;
  }
</style>
