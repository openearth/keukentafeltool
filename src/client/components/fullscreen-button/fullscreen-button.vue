<template>
  <md-button
    :disabled="!supportsFullscreen"
    :aria-label="text"
    class="md-icon-button"
    @click="toggleFullscreen"
  >
    <md-icon aria-hidden="true">
      {{ isFullscreen ? 'fullscreen_exit' : 'fullscreen ' }}
    </md-icon>
    <md-tooltip md-direction="bottom">{{ text }}</md-tooltip>
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
  computed: {
    text() {
      return !this.supportsFullscreen
        ? 'volledig scherm wordt niet ondersteund'
        : this.isFullscreen
          ? 'sluit volledig scherm modus'
          : 'open in volledig scherm'
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
