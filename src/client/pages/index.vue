<template>
  <div class="page-container">
    <md-app class="app-container">
      <md-app-toolbar class="md-primary">
        <span class="md-title">Keukentafel Tool</span>
      </md-app-toolbar>

      <md-app-content>
        <no-ssr>
          <mapbox-map />
        </no-ssr>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import MapboxMap from '~/components/MapboxMap'

export default {
  components: {
    MapboxMap
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
