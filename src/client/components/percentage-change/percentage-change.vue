<template>
  <div v-if="effect && effect.effect && effect.reference">
    <strong>{{ formatNumber(effect.effect) }}</strong>
    <span
      :class="trendClass"
      class="percentage-change__trend"
    >
      {{ formatNumber(percentageChange(effect)) }}%
    </span>
  </div>
  <div v-else>
    - <span class="percentage-change__trend" />
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
      return effect && effect.percentageChange && effect.percentageChange > 0
        ? 'percentage-change__trend--up'
        : 'percentage-change__trend--down'
    }
  },
   methods: {
    formatNumber(value) {
      return formatNumber({ value, digits: 1 })
    },
    percentageChange({ effect, reference }) {
      return Number(effect) / Number(reference) * 100 - 100
    },
   }
}
</script>

<style>
  .percentage-change__trend {
    display: inline-block;
    width: 55px;
    font-size: .8em;
  }
  .percentage-change__trend--down::after {
    display: inline-block;
  }
  .percentage-change__trend--down {
    color: #0f9d58;
  }
  .percentage-change__trend--down::after {
    content: "▼";
  }
  .percentage-change__trend--up {
    color: #d23f31;
  }
  .percentage-change__trend--up::after {
    content: "▲";
  }
</style>
