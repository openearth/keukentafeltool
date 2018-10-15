<template>
  <nuxt-child v-if="isIndex" />
  <div
    v-else
    class="farm-page__panel"
  >
    <farm-nav />
    <div class="farm-page__content">
      <nuxt-child />
    </div>
  </div>
</template>

<script>
import { FarmNav } from '../components'

export default {
  components: { FarmNav },
  computed: {
    isIndex() { return this.$route.name === 'farm' }
  },
}
</script>

<style>
@import "../components/app-core/variables.css";

.farm-page__panel {
  min-width: 50%;
  height: 100%;
  overflow-y: auto;
  background-color: var(--background-light);
}

.farm-page__content {
  padding: 20px;
}
</style>
