<template>
  <nuxt-child v-if="isIndex" />
  <div
    v-else
    class="farm-page__panel"
  >
    <farm-nav />
    <nuxt-child />
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
  padding: 16px;
  overflow-y: auto;
  background-color: var(--background-light);
}
</style>
