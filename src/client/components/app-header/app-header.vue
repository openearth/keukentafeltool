<template>
  <header role="banner">
    <md-toolbar class="md-primary">
      <nuxt-link to="/">
        <h1 class="md-title">Keukentafeltool</h1>
      </nuxt-link>
      <div class="md-toolbar-section-end">
        <restart-button @click="$emit('restart')" />
        <fullscreen-button/>
      </div>
    </md-toolbar>
  </header>
</template>

<script>
import FullscreenButton from '../fullscreen-button'
import RestartButton from '../restart-button'

export default {
  components: { FullscreenButton, RestartButton },
}
</script>
