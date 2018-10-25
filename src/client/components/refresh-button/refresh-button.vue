<template>
  <md-button
    :disabled="!active"
    class="md-icon-button"
    @click="$emit('refresh')"
  >
    <md-icon>refresh</md-icon>
    <md-tooltip md-direction="bottom">
      {{ tooltip }}
    </md-tooltip>
  </md-button>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: true
    },
    tooltip: {
      type: String,
      default: 'refresh'
    }
  }
}
</script>
