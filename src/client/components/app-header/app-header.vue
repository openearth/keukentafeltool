<template>
  <md-toolbar class="md-primary">
    <nuxt-link to="/">
      <h1 class="md-title">Keukentafeltool</h1>
    </nuxt-link>
    <div class="md-toolbar-section-end">
      <refresh-button
        :active="hasFeatures"
        tooltip="reset de gekozen percelen"
        @refresh="$emit('refresh')"
      />
      <fullscreen-button/>
    </div>
  </md-toolbar>
</template>

<script>
import FullscreenButton from '../fullscreen-button'
import RefreshButton from '../refresh-button'

export default {
  components: {
    FullscreenButton,
    RefreshButton
  },
  props: {
    hasFeatures: {
      type: Boolean,
      default: false
    }
  }
}
</script>
