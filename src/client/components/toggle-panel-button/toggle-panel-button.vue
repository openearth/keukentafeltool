<template>
  <md-button
    :aria-label="text"
    class="toggle-panel-button"
    @click="$emit('toggle')"
  >
    <md-icon
      :class="{ 'toggle-panel-button__icon--mirrored': isOpen }"
      aria-hidden="true"
    >keyboard_tab</md-icon>
    <md-tooltip md-direction="left">{{ text }}</md-tooltip>
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
    computed: {
      text() { return this.isOpen ? 'verklein paneel' : 'vergroot paneel' }
    },
  }
</script>

<style>
  /* overwrite defaults of .md-button: */
  .md-button.toggle-panel-button {
    min-width: 40px;
  }

  .toggle-panel-button__icon--mirrored {
    transform: rotateY(180deg);
  }
</style>
