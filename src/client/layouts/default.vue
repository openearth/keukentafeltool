<template>
  <div class="default-layout">
    <app-header />
    <main class="default-layout__content">
      <nuxt/>
      <div class="default-layout__content-right">
        <no-ssr>
          <mapbox-map
            @parcels_addFeature="addParcel"
            @parcels_removeFeature="removeParcel"
          />
        </no-ssr>
        <portal-target
          name="footer-bar"
          slim
        />
      </div>
    </main>
  </div>
</template>

<script>
import { AppHeader, MapboxMap } from '../components'

export default {
  components: { AppHeader, MapboxMap },
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
@import '../components/app-core/index.css';

.default-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.default-layout__content {
  overflow-y: scroll;
  display: flex;
  flex: 1;
}

.default-layout__content-right {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
