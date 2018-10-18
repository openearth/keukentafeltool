<template>
  <nuxt-child v-if="isIndex" />
  <div
    v-else
    :class="{ [`farm-page__panel--wide`]: contentIsOpen }"
    class="farm-page__panel"
  >
    <farm-nav />
    <div class="farm-page__content">
      <nuxt-child />
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
      contentIsOpen: false
    }
  },
  computed: {
    isIndex() { return this.$route.name === 'farm' },
    toggleIcon() {
      return this.contentIsOpen ? 'keyboard_arrow_left' : 'keyboard_arrow_right'
    }
  },
  methods: {
    toggleContent() {
      this.contentIsOpen = !this.contentIsOpen
    }
  }
}
</script>

<style>
@import "../components/app-core/variables.css";

.farm-page__panel {
  position: relative;
  min-width: 50%;
  height: 100%;
  overflow-y: auto;
  background-color: var(--background-light);
}

.farm-page__panel--wide {
  min-width: 85%;
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
