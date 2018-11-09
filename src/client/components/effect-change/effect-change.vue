<template>
  <span v-if="effect && effect.delta && effect.deltaPercentage">
    {{ effect.delta }} ({{ effect.deltaPercentage }} %)
  </span>
  <span v-else>
    -
  </span>
</template>

<script>
export default {
  props: {
    effect: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
