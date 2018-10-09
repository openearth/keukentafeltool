<template>
  <div
    v-resize:debounce="resize"
    ref="mapboxMap"
    class="mapbox-map"
  />
</template>

<script>
import mapFactory from '../../lib/_mapbox/map-factory'
import { parcelsLayer } from '../../lib/_mapbox/wms-layer'

export default {
  data() {
    return {
      map: undefined
    }
  },
  async mounted() {
    this.map = mapFactory(this.$refs.mapboxMap)
    this.map.on('load', () => {
      this.map.addLayer(parcelsLayer())
    })
  },
  methods: {
    resize() {
      this.map.resize() // force redraw of the Mapbox map
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
