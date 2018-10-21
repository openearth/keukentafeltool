<template>
  <md-button
    :disabled="!supportsFullscreen"
    class="md-icon-button"
    @click="toggleFullscreen"
  >
    <md-icon>{{ isFullscreen ? 'fullscreen_exit' : 'fullscreen ' }}</md-icon>
    <md-tooltip md-direction="bottom">
      <template v-if="!supportsFullscreen">volledig scherm wordt niet ondersteund</template>
      <template v-else-if="isFullscreen">sluit volledig scherm modus</template>
      <template v-else>open in volledig scherm</template>
    </md-tooltip>
  </md-button>
</template>

<script>
import fscreen from 'fscreen'

export default {
  data() {
    return {
      isFullscreen: false,
      supportsFullscreen: false,
    }
  },
  mounted() {
    fscreen.addEventListener('fullscreenchange', this.updateIsFullscreen)
    this.updateIsFullscreen()
    this.supportsFullscreen = fscreen.fullscreenEnabled
  },
  destroyed() {
    fscreen.removeEventListener('fullscreenchange', this.updateIsFullscreen)
  },
  methods: {
    updateIsFullscreen() {
      this.isFullscreen = !!fscreen.fullscreenElement
    },
    toggleFullscreen() {
      if (this.isFullscreen) {
        fscreen.exitFullscreen()
      } else {
        fscreen.requestFullscreen(document.documentElement)
      }
    },
  },
}
</script>
