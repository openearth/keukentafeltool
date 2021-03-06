<template>
  <div class="data-table effects-table">
    <div class="data-table__container">
      <div class="data-table__static-header">
        <table class="data-table__table">
          <thead>
            <tr class="data-table__table-head__row">
              <th class="data-table__header-cell data-table__cell--no-border data-table__cell--wAuto">
                <div class="data-table__content data-table__content--w60">
                  Perceel
                </div>
              </th>
              <th class="data-table__header-cell">
                <div class="data-table__content data-table__content--w40 data-table__cell--wAuto" />
              </th>
              <th class="data-table__header-cell data-table__cell--w33pct">
                <div class="data-table__content data-table__content--center effects-table__content--nutrient">
                  Nitraat <br>
                  <small>(NO<sub>3</sub> mg/l)</small>
                </div>
              </th>
              <th class="data-table__header-cell data-table__cell--w33pct">
                <div class="data-table__content data-table__content--center effects-table__content--nutrient">
                  Stikstof <br>
                  <small>(Vracht N kg/ha)</small>
                </div>
              </th>
              <th class="data-table__header-cell data-table__cell--w33pct">
                <div class="data-table__content data-table__content--center effects-table__content--nutrient">
                  Fosfor <br>
                  <small>(Vracht P kg/ha)</small>
                </div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="data-table__scroll-vertical">
        <table class="data-table__table">
          <tbody>
            <template
              v-for="parcel in parcels"
            >
              <tr
                :key="parcel.id"
              >
                <td
                  class="data-table__cell data-table__cell--no-border"
                  rowspan="2"
                >
                  <div class="data-table__content data-table__content--w60">{{ parcel.id }}</div>
                </td>
                <td class="data-table__cell">
                  <div class="data-table__content data-table__content--w40">Voor</div>
                </td>
                <td
                  v-for="metric in metrics"
                  :key="metric"
                  class="data-table__cell data-table__cell--w33pct"
                >
                  <div class="data-table__content data-table__content--numeric effects-table__content--nutrient">
                    {{ formatNumber(referenceValue({ parcel, metric })) }}
                    <span class="effects-table__trend" />
                  </div>
                </td>
              </tr>
              <tr
                :key="parcel.id+'row2'"
              >
                <td class="data-table__cell data-table__cell--no-border">
                  <div class="data-table__content data-table__content--w40">Na</div>
                </td>
                <td
                  v-for="metric in metrics"
                  :key="metric"
                  class="data-table__cell data-table__cell--w33pct"
                >
                  <div class="data-table__content data-table__content--numeric effects-table__content--nutrient">
                    <template v-if="isLoaded">
                      <percentage-change :effect="effect({ parcelId: parcel.id, metric })" />
                    </template>
                    <template v-else>
                      <skeleton-value class="effects-table__skeleton-value" />
                      <span class="effects-table__trend" />
                    </template>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import PercentageChange from '../percentage-change'
import SkeletonValue from '../skeleton-value'
import formatNumber from '../../lib/format-number'

export default {
  components: {
    PercentageChange,
    SkeletonValue
  },
  props: {
    effects: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    parcels: {
      type: Array,
      required: true,
      default: () => [],
    }
  },
  data() {
    return {
      metrics: ['no3', 'ndrain', 'pdrain'],
    }
  },
  computed: {
    isLoaded() { return Object.keys(this.effects).length > 0 },
  },
  methods: {
    effect({ parcelId, metric }) {
      const effect = this.effects[parcelId]
      return effect
        ? { effect: effect.effect[metric], reference: effect.reference[metric] }
        : undefined
    },
    formatNumber(value) {
      return formatNumber({ value, digits: 1 })
    },
    referenceValue({ parcel, metric }) {
      return parcel.properties[`ref${metric}`]
    }
  }
}
</script>

<style>
  .effects-table,
  .effects-table .data-table__static-header,
  .effects-table .data-table__scroll-vertical,
  .effects-table .data-table__scroll-horizontal {
    width: 100%;
    min-width: 512px;
  }
  .effects-table
  .effects-table__skeleton-value {
    width: 2.5em;
  }
  .effects-table__trend {
    display: inline-block;
    width: 55px;
    font-size: .8em;
  }
  .effects-table td:first-child {
    vertical-align: middle;
  }
  .effects-table td:first-child {
    border-bottom: 1px solid rgba(102, 102, 102, 0.1);
  }
  .data-table__content.effects-table__content--nutrient {
    width: 104px;
  }
  .effects-table tr:nth-child(even) {
    border-bottom: 1px solid rgba(102, 102, 102, 0.1);
  }
</style>
