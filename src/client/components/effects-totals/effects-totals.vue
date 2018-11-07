<template>
  <section class="effects-totals">
    <div class="effects-totals__container">
      <div class="effects-totals__caption">
        <h2 class="effects-totals__title">Totaal</h2>
        <small class="effects-totals__description">
          <template v-if="parcelsTotal === 1">1 perceel,</template>
          <template v-else>{{ parcelsTotal }} percelen,</template>
          {{ formatNumber(areaTotal) }} ha
        </small>
      </div>
      <div class="effects-totals__metric">
        <div class="effects-totals__metric-label">
          Nitraat <br>
          <small>(NO<sub>3</sub> mg/l)</small>
        </div>
        <div class="effects-totals__metric-value">
          {{ formatNumber(no3AverageRef) }}
          <span class="effects-totals__trend" />
        </div>
        <strong class="effects-totals__metric-value">
          {{ formatNumber(no3AverageEffect) }}
          <span class="effects-totals__trend">
            {{ formatNumber(no3Trend) }}%
          </span>
        </strong>
      </div>
      <div class="effects-totals__metric">
        <div class="effects-totals__metric-label">
          Stikstof <br>
          <small>(Vracht N kg/ha)</small>
        </div>
        <div class="effects-totals__metric-value">
          {{ formatNumber(ndrainAverageRef) }}
          <span class="effects-totals__trend" />
        </div>
        <strong class="effects-totals__metric-value">
          {{ formatNumber(ndrainAverageEffect) }}
          <span class="effects-totals__trend">
            {{ formatNumber(ndrainTrend) }}%
          </span>
        </strong>
      </div>
      <div class="effects-totals__metric">
        <div class="effects-totals__metric-label">
          Fosfor <br>
          <small>(Vracht P kg/ha)</small>
        </div>
        <div class="effects-totals__metric-value">
          {{ formatNumber(pdrainAverageRef) }}
          <span class="effects-totals__trend" />
        </div>
        <strong class="effects-totals__metric-value">
          {{ formatNumber(pdrainAverageEffect) }}
          <span class="effects-totals__trend">
            {{ formatNumber(pdrainTrend) }}%
          </span>
        </strong>
      </div>
    </div>
  </section>
</template>

<script>
import formatNumber, { isNumber, toNumber } from '../../lib/format-number'

export default {
  props: {
    effects: {
      type: Array,
      required: true,
      default: () => [],
    },
    parcels: {
      type: Array,
      required: true,
      default: () => [],
    }
  },
  computed: {
    areaTotal() {
      return this.parcels
        .map(parcel => toNumber(parcel.properties.areaal))
        .filter(isNumber)
        .reduce((total, value) => total + value, 0)
    },
    ndrainAverageRef() { return this.calculateAverageRef({ metric: 'ndrain' }) },
    ndrainAverageEffect() { return this.calculateAverageEffect({ metric: 'ndrain' }) },
    ndrainTrend() { return this.calculateTrend({ metric: 'ndrain' }) },
    no3AverageRef() { return this.calculateAverageRef({ metric: 'no3' }) },
    no3AverageEffect() { return this.calculateAverageEffect({ metric: 'no3' }) },
    no3Trend() { return this.calculateTrend({ metric: 'no3' }) },
    pdrainAverageRef() { return this.calculateAverageRef({ metric: 'pdrain' }) },
    pdrainAverageEffect() { return this.calculateAverageEffect({ metric: 'pdrain' }) },
    pdrainTrend() { return this.calculateTrend({ metric: 'pdrain' }) },
  },
  methods: {
    calculateAverageRef({ metric }) {
      const total = this.parcels.reduce((total, parcel) => {
        const area = toNumber(parcel.properties.areaal)
        const refValue = parcel.properties[`ref${metric}`]
        return total += area * refValue
      }, 0)
      return total / this.areaTotal
    },
    calculateAverageEffect({ metric }) {
      const { effects, parcels } = this
      const total = parcels.reduce((total, parcel) => {
        const area = toNumber(parcel.properties.areaal)
        const effectValue = effects
          .filter(effect => String(effect.pid) === String(parcel.id))
          .map(effect => effect[`eff${metric}`])
          .reduce((total, value) => total + value, 0)
        return total += area * effectValue
      }, 0)
      return total / this.areaTotal
    },
    calculateTrend({ metric }) {
      return this[`${metric}AverageEffect`] / this[`${metric}AverageRef`] * 100 - 100
    },
    formatNumber(value) {
      return formatNumber({ value, digits: 1 })
    },
  }
}
</script>

<style>
  .effects-totals {
    background: #ffffff;
    z-index: 1;
    /* custom boxshadow based on md elevation 2 but vertically reversed (seems that there are some strange light sources at play) */
    box-shadow: 0 -3px 1px -2px rgba(0,0,0,.2), 0 -2px 2px 0 rgba(0,0,0,.14), 0 -1px 5px 0 rgba(0,0,0,.12);
    width: 100%;
    min-width: 512px;
  }
  .effects-totals__container {
    padding: 10px 0 10px 10px;
    display: flex;
    justify-content: flex-end;
    width: 512px;
  }
  .effects-totals__caption {
    margin-right: auto;
  }
  .effects-totals__title {
    margin-top: 4px;
    margin-bottom: 0;
    font-size: 14px;
  }
  .effects-totals__description {
    color: var(--md-theme-default-text-accent-on-background, rgba(0, 0, 0, 0.54));
  }
  .effects-totals__metric {
    min-height: 50px;
    padding: 0 10px;
    text-align: right;
    width: 124px;
  }
  .effects-totals__metric:last-child {
    margin-right: 0;
  }
  .effects-totals__metric-label {
    font-size: 13px;
    font-weight: bold;
    text-align: center;
    min-height: 44px;
    margin-bottom: 4px;
    color: var(--md-theme-default-text-accent-on-background, rgba(0, 0, 0, 0.54));
  }
  .effects-totals__metric-value {
    white-space: nowrap;
  }
  .effects-totals__trend {
    display: inline-block;
    width: 55px;
    font-size: .8em;
}
</style>
