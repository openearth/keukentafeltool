<template>
  <nuxt-child
    v-if="isIndex"
    @fitFeatures="fitFeatures"
  />
  <div
    v-else
    :class="{ [`farm-page__panel--visible`]: panelContentLoaded, [`farm-page__panel--wide`]: contentIsOpen }"
    class="farm-page__panel"
  >
    <farm-nav />
    <div class="farm-page__content">
      <nuxt-child
        @fitFeatures="fitFeatures"
        @hasRequiredFeatures="showContent"
      />
    </div>
    <md-button
      class="md-button farm-page__toggle-content"
      @click="toggleContent"
    >
      <md-icon>{{ toggleIcon }}</md-icon>
    </md-button>
  </div>
</template>

<script>
import { FarmNav } from '../components'

export default {
  components: { FarmNav },
  data() {
    return {
      contentIsOpen: false,
      panelContentLoaded: false
    }
  },
  computed: {
    isIndex() { return this.$route.name === 'farm' },
    toggleIcon() {
      return this.contentIsOpen ? 'keyboard_arrow_left' : 'keyboard_arrow_right'
    }
  },
  methods: {
    fitFeatures() {
      setTimeout(() => {
        this.$store.dispatch('mapbox/features/fitToFeatures')
      }, 300)
    },
    showContent() {
      this.panelContentLoaded = true
    },
    toggleContent() {
      this.contentIsOpen = !this.contentIsOpen
    },
  }
}
</script>

<style>
@import "../components/app-core/variables.css";

.farm-page__panel {
  position: relative;
  width: 0;
  height: 100%;
  overflow-y: auto;
  background-color: var(--background-light);
  transition: .5s width cubic-bezier(0.075, 0.82, 0.165, 1);
}

.farm-page__panel--visible {
  width: 100%;
}

.farm-page__panel--wide {
  width: 200%;
}

.farm-page__content {
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 60px;
}

.farm-page__toggle-content {
  position: absolute;
  top: 50%;
  right: 10px;
  width: 40px !important;
  min-width: 40px !important;
  padding: 0 !important;
  margin: 0 !important;
}
</style>
