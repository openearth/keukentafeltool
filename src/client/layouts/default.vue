<template>
  <div class="default-layout">
    <app-header />
    <main class="default-layout__content">
      <nuxt/>
      <no-ssr>
        <mapbox-map />
      </no-ssr>
    </main>
  </div>
</template>

<script>
import { AppHeader, MapboxMap } from '../components'

export default {
  components: { AppHeader, MapboxMap },
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
</style>
