<template>
  <div
    ref="mapboxMap"
    class="mapbox-map"
  />
</template>

<script>
import mapFactory from '~/lib/_mapbox/map-factory'
import { parcelsLayer } from '~/lib/_mapbox/wms-layer'

export default {
  async mounted() {
    const map = mapFactory(this.$refs.mapboxMap)

    map.on('load', () => {
      map.addLayer(parcelsLayer())
    })
  },
}
</script>

<style>
  .mapbox-map {
    width: 100%;
    height: 100%;
  }
</style>
