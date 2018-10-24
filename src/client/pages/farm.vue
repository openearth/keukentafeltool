<template>
  <nuxt-child
    v-if="isIndex"
    @fitFeatures="fitFeatures"
  />
  <div
    v-else
    :class="{ 'farm-page__panel--wide': panelIsOpen }"
    class="farm-page__panel md-elevation-3"
  >
    <header class="farm-page__panel-header">
      <farm-nav />
      <toggle-panel-button
        :is-open="panelIsOpen"
        @toggle="togglePanel"
      />
    </header>
    <nuxt-child @fitFeatures="fitFeatures" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { FarmNav, TogglePanelButton } from '../components'

export default {
  components: { FarmNav, TogglePanelButton },
  data() {
    return {
      panelIsOpen: false,
    }
  },
  computed: {
    ...mapState('mapbox/features', [ 'features' ]),
    isIndex() { return this.$route.name === 'farm' },
  },
  methods: {
    fitFeatures() {
      setTimeout(() => {
        this.$store.dispatch('mapbox/features/fitToFeatures')
      }, 500)
    },
    togglePanel() { this.panelIsOpen = !this.panelIsOpen },
  },
}
</script>

<style>
@import "../components/app-core/variables.css";

.farm-page__panel {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: var(--background-light);
}
.farm-page__panel--wide {
  width: 200%;
}

.farm-page__panel-header {
  display: flex;
  justify-content: space-between;
  background-color: white;
}
</style>
