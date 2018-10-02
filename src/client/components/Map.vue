<template>
  <div
    ref="mbMap"
    class="mb-map"
  />
</template>

<script>
let mapboxgl

if (process.browser) {
  // use old skool `require` because there is no support for dynamic `import`
  mapboxgl = require('mapbox-gl')
}

const MAP_CENTER = [ 5.10, 52.09 ]
const MAP_ZOOM = 7
const MAPBOX_TOKEN = 'pk.eyJ1Ijoic2lnZ3lmIiwiYSI6ImNqbHcwcHFjNjBsdGIza3F1dW5iZjhhY2EifQ.zZkkozZlSRtmB9VgpR9HiQ'

export default {
  async mounted() {
    mapboxgl.accessToken = MAPBOX_TOKEN
    const map = new mapboxgl.Map({
      container: this.$refs.mbMap,
      center: MAP_CENTER,
      zoom: MAP_ZOOM,
      style: 'mapbox://styles/mapbox/streets-v9'
    })
  }
}
</script>

<style>
  .mb-map {
    width: 100%;
    height: 100%;
  }
</style>
