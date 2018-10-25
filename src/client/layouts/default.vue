<template>
  <div class="default-layout">
    <app-header
      :has-features="hasFeatures"
      @panTo="focusOnFeatures"
      @refresh="resetFeatures"
    />
    <main class="default-layout__content">
      <nuxt/>
      <div class="default-layout__content-right">
        <no-ssr>
          <mapbox-map @mapCreated="setMap" />
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
import { mapState } from 'vuex'
import { AppHeader, MapboxMap } from '../components'

export default {
  components: { AppHeader, MapboxMap },
  computed: {
    ...mapState('mapbox/features', [ 'features' ]),
    hasFeatures() { return !!(this.features && this.features.length) }
  },
  methods: {
    focusOnFeatures() {
      this.$store.dispatch('mapbox/features/fitToFeatures')
    },
    resetFeatures() {
      this.$store.dispatch('mapbox/features/resetFeatures')
      this.$store.dispatch('mapbox/addOnceEventHandler', {
        event: 'resize',
        handler: () => this.$store.dispatch('mapbox/moveMapToCenter')
      })
      this.$router.push('/farm/')
    },
    setMap(map) {
      this.$store.dispatch('mapbox/initMap', map)
    }
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
