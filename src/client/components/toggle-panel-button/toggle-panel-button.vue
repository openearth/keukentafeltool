<template>
  <md-button
    class="toggle-panel-button"
    @click="$emit('toggle')"
  >
    <md-icon>{{ isOpen ? 'keyboard_arrow_left' : 'keyboard_arrow_right' }}</md-icon>
    <md-tooltip md-direction="left">{{ isOpen ? 'verklein paneel' : 'vergroot paneel' }}</md-tooltip>
  </md-button>
</template>

<script>
  export default {
    props: {
      isOpen: {
        type: Boolean,
        default: false,
      }
    },
  }
</script>

<style>
  /* overwrite defaults of .md-button: */
  .md-button.toggle-panel-button {
    min-width: 40px;
  }
</style>
