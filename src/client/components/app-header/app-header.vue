<template>
  <header role="banner">
    <md-toolbar class="md-primary">
      <nuxt-link to="/">
        <h1 class="md-title">Keukentafeltool</h1>
      </nuxt-link>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-icon-button"
          @click="$emit('refresh')"
        >
          <md-icon aria-hidden="true">refresh</md-icon>
        </md-button>
        <fullscreen-button/>
      </div>
    </md-toolbar>
  </header>
</template>

<script>
import FullscreenButton from '../fullscreen-button'

export default {
  components: { FullscreenButton },
}
</script>
