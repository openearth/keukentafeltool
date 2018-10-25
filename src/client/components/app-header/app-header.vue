<template>
  <md-toolbar class="md-primary">
    <nuxt-link to="/">
      <h1 class="md-title">Keukentafeltool</h1>
    </nuxt-link>
    <div class="md-toolbar-section-end">
      <pan-button
        :active="hasFeatures"
        class="header-button"
        tooltip="focus op de percelen"
        @panTo="$emit('panTo')"
      />
      <refresh-button
        :active="hasFeatures"
        class="header-button"
        tooltip="reset de gekozen percelen"
        @refresh="$emit('refresh')"
      />
      <fullscreen-button/>
    </div>
  </md-toolbar>
</template>

<script>
import FullscreenButton from '../fullscreen-button'
import PanButton from '../pan-button'
import RefreshButton from '../refresh-button'

export default {
  components: {
    FullscreenButton,
    PanButton,
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

<style>
  .header-button:disabled {
    opacity: .6;
  }
</style>
