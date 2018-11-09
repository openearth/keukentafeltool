<template>
  <div class="default-layout">
    <app-header @restart="restart" />
    <main class="default-layout__content">
      <nuxt/>
      <div class="default-layout__content-right">
        <no-ssr>
          <mapbox-map
            @autoFocus="autoFocus"
            @mapCreated="setMap"
          />
        </no-ssr>
        <div class="default-layout__portal-placeholder">
          <portal-target
            name="footer-bar"
            slim
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { AppHeader, MapboxMap } from '../components'

export default {
  components: { AppHeader, MapboxMap },
  beforeMount() {
    this.$store.dispatch('measures/getMeasures')
  },
  methods: {
    autoFocus() {
      this.$store.dispatch('mapbox/features/fitToFeatures')
    },
    restart() {
      this.$store.commit('measures/unassignAllMeasures')
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
/*
** Below fixes a strange resize in the map ... hopefully we can remove this in the next version.
*/
.default-layout__portal-placeholder {
  height: 64px;
  overflow: hidden;
}
</style>
