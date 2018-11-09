<template>
  <section class="effects-totals">
    <table class="data-table__table">
      <tbody>
        <tr>
          <td
            rowspan="2"
            class="data-table__cell data-table__cell--no-border"
          >
            <div class="data-table__content data-table__content--w60">
              <h2 class="effects-totals__title">Totaal</h2>
              <small class="effects-totals__description">
                <template v-if="parcelsTotal === 1">1 perceel,</template>
                <template v-else>{{ parcelsTotal }} percelen,<br></template>
                {{ formatNumber(areaTotal) }} ha
              </small>
            </div>
          </td>
          <td class="data-table__cell">
            <div class="data-table__content data-table__content--w40">
              Voor
            </div>
          </td>
          <td class="data-table__cell data-table__cell--w33pct">
            <div class="data-table__content data-table__content--numeric effects-table__content--nutrient">
              {{ formatNumber(no3AverageRef) }}
              <span class="effects-table__trend"/>
            </div>
          </td>
          <td class="data-table__cell data-table__cell--w33pct">
            <div class="data-table__content data-table__content--numeric effects-table__content--nutrient">
              {{ formatNumber(ndrainAverageRef) }}
              <span class="effects-table__trend"/>
            </div>
          </td>
          <td class="data-table__cell data-table__cell--w33pct">
            <div class="data-table__content data-table__content--numeric effects-table__content--nutrient">
              {{ formatNumber(pdrainAverageRef) }}
              <span class="effects-table__trend"/>
            </div>
          </td>
        </tr>
        <tr>
          <td class="data-table__cell data-table__cell--no-border">
            <div class="data-table__content data-table__content--w40">
              Na
            </div>
          </td>
          <td class="data-table__cell data-table__cell--w33pct">
            <div class="data-table__content data-table__content--numeric effects-table__content--nutrient">
              <strong class="effects-totals__metric-value">
                {{ formatNumber(no3AverageEffect) }}
                <span class="effects-totals__trend">
                  {{ formatNumber(no3Trend) }}%
                </span>
              </strong>
            </div>
          </td>
          <td class="data-table__cell data-table__cell--w33pct">
            <div class="data-table__content data-table__content--numeric effects-table__content--nutrient">
              <strong class="effects-totals__metric-value">
                {{ formatNumber(ndrainAverageEffect) }}
                <span class="effects-totals__trend">
                  {{ formatNumber(ndrainTrend) }}%
                </span>
              </strong>
            </div>
          </td>
          <td class="data-table__cell data-table__cell--w33pct">
            <div class="data-table__content data-table__content--numeric effects-table__content--nutrient">
              <strong class="effects-totals__metric-value">
                {{ formatNumber(pdrainAverageEffect) }}
                <span class="effects-totals__trend">
                  {{ formatNumber(pdrainTrend) }}%
                </span>
              </strong>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
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
    parcelsTotal() { return this.parcels.length },
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
    padding: 10px 0;
  }
  .effects-totals__title {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 14px;
  }
  .effects-totals__description {
    color: var(--md-theme-default-text-accent-on-background, rgba(0, 0, 0, 0.54));
  }
  .effects-totals__trend {
    display: inline-block;
    width: 55px;
    font-size: .8em;
  }
</style>
