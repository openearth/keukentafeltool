<template>
  <nuxt-child
    v-if="isIndex"
    @fitFeatures="fitFeatures"
  />
  <div
    v-else
    :class="{
      'farm-page__panel--wide': panelIsOpen,
      'farm-page__panel--hidden': !panelIsVisible
    }"
    class="farm-page__panel md-elevation-3"
  >
    <header class="farm-page__panel-header">
      <farm-nav/>
      <toggle-panel-button
        :is-open="panelIsOpen"
        @toggle="togglePanel"
      />
    </header>
    <nuxt-child
      @fitFeatures="fitFeatures"
      @hasRequiredFeatures="showPanel"
    />
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
      panelIsVisible: false
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
    showPanel() { this.panelIsVisible = true }
  },
}
</script>

<style>
@import "../components/app-core/variables.css";

.farm-page__panel {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: var(--background-light);
  overflow: hidden;
  display: flex;
  flex-direction: column
}
.farm-page__panel--wide {
  width: 200%;
}

.farm-page__panel--hidden {
  width: 0;
}

.farm-page__panel-header {
  background-color: white;
}
.toggle-panel-button {
  position: absolute;
  top: 0;
  right: 0;
}

.farm-page__panel-content {
  display: flex;
  flex-wrap: nowrap;
  overflow-y: auto;
  flex-direction: column;
  position: relative;
  flex: 1 1 auto;
}
</style>
