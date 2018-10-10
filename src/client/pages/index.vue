<template>
  <div class="page-container">
    <md-app class="app-container">
      <md-app-toolbar class="md-primary">
        <span class="md-title">Keukentafel Tool</span>
      </md-app-toolbar>

      <md-app-content>
        <no-ssr>
          <mapbox-map
            @parcels_addFeature="addParcel"
            @parcels_removeFeature="removeParcel"
          />
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
  },
  methods: {
    addParcel({ feature }) {
      this.$store.commit('parcels/addParcel', feature)
    },
    removeParcel({ id }) {
      this.$store.commit('parcels/removeParcel', id)
    },
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
