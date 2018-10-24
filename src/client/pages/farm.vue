<template>
  <nuxt-child
    v-if="isIndex"
    @fitFeatures="fitFeatures"
  />
  <div
    v-else
    :class="{
      'farm-page__panel--wide': panelIsOpen,
      'farm-page__panel--hidden': !hasFeatures
    }"
    class="farm-page__panel"
  >
    <farm-nav />
    <div class="farm-page__content">
      <nuxt-child
        @fitFeatures="fitFeatures"
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
import { mapState } from 'vuex'
import { FarmNav } from '../components'

export default {
  components: { FarmNav },
  data() {
    return {
      panelIsOpen: false,
    }
  },
  computed: {
    ...mapState('mapbox/features', [ 'features' ]),
    isIndex() { return this.$route.name === 'farm' },
    hasFeatures() {
      return !!(this.features && this.features.length)
    },
    toggleIcon() {
      return this.panelIsOpen ? 'keyboard_arrow_left' : 'keyboard_arrow_right'
    }
  },
  mounted() {
    console.log('MOUNTED FARM')
    setTimeout(() => {
        this.hasFeatures = true
      }, 500)
  },
  methods: {
    fitFeatures() {
      setTimeout(() => {
        this.$store.dispatch('mapbox/features/fitToFeatures')
      }, 500)
    },
    toggleContent() {
      this.panelIsOpen = !this.panelIsOpen
    },
  }
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

.farm-page__panel--hidden {
  width: 0%;
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
