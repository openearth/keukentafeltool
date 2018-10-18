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
const isIndexRoute = route => (route.name === 'farm')

export default {
  components: { FarmNav },
  computed: {
    isIndex() { return isIndexRoute(this.$route) },
  },
  /**
   * If a user tries to access a farm child route without having any parcels selected,
   * they are redirected to the farm index page, where they can select parcels.
   */
  validate({ redirect, route, store }) {
    const hasSelectedParcels = (store.state.parcels.parcels.length > 0)
    if (isIndexRoute(route)) return true
    if (hasSelectedParcels) return true
    redirect('/farm')
  }
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
