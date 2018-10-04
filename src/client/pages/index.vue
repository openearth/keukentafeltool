<template>
  <div class="page-container">
    <md-app class="app-container">
      <md-app-toolbar class="md-primary">
        <span class="md-title">Keukentafel Tool</span>
      </md-app-toolbar>

      <md-app-content>
        <no-ssr>
          <mapboxgl-map />
        </no-ssr>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import MapboxglMap from '~/components/MapboxglMap'

export default {
  components: {
    MapboxglMap
  }
}
</script>

<style>
  .page-container,
  .app-container {
    width: 100vw;
    height: 100vh;
  }
</style>
