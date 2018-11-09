<template>
  <div v-if="effect && effect.delta && effect.deltaPercentage">
    <strong>{{ formatNumber(effect.delta) }}</strong>
    <span
      :class="trendClass"
      class="effects-change__trend"
    >
      {{ effect.deltaPercentage }}%
    </span>
  </div>
  <div v-else>
    - <span class="effects-change__trend" />
  </div>
</template>

<script>
import formatNumber from '../../lib/format-number'

export default {
  props: {
    effect: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    trendClass() {
      const { effect } = this
      return effect && effect.deltaPercentage && effect.deltaPercentage > 0
        ? 'effects-change__trend--up'
        : 'effects-change__trend--down'
    }
  },
   methods: {
    formatNumber(value) {
      return formatNumber({ value, digits: 1 })
    }
   }
}
</script>

<style>
  .effects-change__trend {
    display: inline-block;
    width: 55px;
    font-size: .8em;
  }
  .effects-change__trend--down::after {
    display: inline-block;
  }
  .effects-change__trend--down {
    color: #0f9d58;
  }
  .effects-change__trend--down::after {
    content: "▼";
  }
  .effects-change__trend--up {
    color: #d23f31;
  }
  .effects-change__trend--up::after {
    content: "▲";
  }
</style>
