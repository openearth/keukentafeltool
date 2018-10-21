<template>
  <nuxt-child v-if="isIndex" />
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
    <nuxt-child />
  </div>
</template>

<script>
import { FarmNav, TogglePanelButton } from '../components'

export default {
  components: { FarmNav, TogglePanelButton },
  data() {
    return {
      panelIsOpen: false,
    }
  },
  computed: {
    isIndex() { return this.$route.name === 'farm' },
  },
  methods: {
    togglePanel() { this.panelIsOpen = !this.panelIsOpen },
  }
}
</script>

<style>
@import "../components/app-core/variables.css";

.farm-page__panel {
  position: relative;
  z-index: 1;
  min-width: 50%;
  height: 100%;
  overflow-y: auto;
  background-color: var(--background-light);
}
.farm-page__panel--wide {
  min-width: 85%;
}

.farm-page__panel-header {
  display: flex;
  justify-content: space-between;
  background-color: white;
}
</style>
