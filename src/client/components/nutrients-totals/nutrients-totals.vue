<template>
  <section class="nutrients-totals">
    <div class="nutrients-totals__container">
      <div class="nutrients-totals__caption">
        <h2 class="nutrients-totals__title">Totaal</h2>
        <small class="nutrients-totals__description">
          <template v-if="parcelsTotal === 1">1 perceel,</template>
          <template v-else>{{ parcelsTotal }} percelen,</template>
          {{ formatNumber(areaTotal) }} ha
        </small>
      </div>
      <div class="nutrients-totals__metric">
        <div class="nutrients-totals__metric-label">
          Nitraat <br>
          (NO<sub>3</sub> mg/l)
        </div>
        <strong class="nutrients-totals__metric-value">
          {{ formatNumber(no3Total) }}
        </strong>
      </div>
      <div class="nutrients-totals__metric">
        <div class="nutrients-totals__metric-label">
          Stikstof <br>
          (Vracht N kg)
        </div>
        <strong class="nutrients-totals__metric-value">
          {{ formatNumber(ndrainTotal) }}
        </strong>
      </div>
      <div class="nutrients-totals__metric">
        <div class="nutrients-totals__metric-label">
          Fosfor <br>
          (Vracht P kg)
        </div>
        <strong class="nutrients-totals__metric-value">
          {{ formatNumber(pdrainTotal) }}
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
    ndrainTotal() { return this.calculateDrainTotal({ metric: 'ndrain' }) },
    no3Total() { return this.calculateDrainTotal({ metric: 'no3' }) / this.areaTotal },
    parcelsTotal() { return this.parcels.length },
    pdrainTotal() { return this.calculateDrainTotal({ metric: 'pdrain' }) },
  },
  methods: {
    calculateDrainTotal({ metric }) {
      const { effects, parcels } = this
      return parcels.reduce((total, parcel) => {
        const area = toNumber(parcel.properties.areaal)
        const refValue = parcel.properties[`ref${metric}`]
        const deltaValue = effects
          .filter(effect => String(effect.pid) === String(parcel.id))
          .map(effect => effect[`eff${metric}`])
          .reduce((total, value) => total + value, 0)
        return total += area * (refValue + deltaValue)
      }, 0)
    },
    formatNumber(value) {
      return formatNumber({ value })
    },
  }
}
</script>

<style>
  .nutrients-totals {
    padding: 10px;
    background: #ffffff;
    z-index: 1;
    /* custom boxshadow based on md elevation 4 but vertically reversed (seems that there are some strange light sources at play) */
    box-shadow: 0 -2px 4px -1px rgba(0,0,0,.2), 0 -4px 5px 0 rgba(0,0,0,.14), 0 -1px 10px 0 rgba(0,0,0,.12);
  }
  .nutrients-totals__container {
    display: flex;
    justify-content: flex-end;
    max-width: 634px;
  }
  .nutrients-totals__caption {
    margin-right: auto;
    padding-left: 5px;
  }
  .nutrients-totals__title {
    margin-top: 4px;
    margin-bottom: 0;
    font-size: 14px;
  }
  .nutrients-totals__description {
    color: var(--md-theme-default-text-accent-on-background, rgba(0, 0, 0, 0.54));
  }
  .nutrients-totals__metric {
    min-height: 50px;
    padding: 0 8px;
    text-align: right;
    width: 99px;
  }
  .nutrients-totals__metric:last-child {
    margin-right: 0;
  }
  .nutrients-totals__metric-label {
    font-size: 12px;
    min-height: 44px;
    margin-bottom: 4px;
    color: var(--md-theme-default-text-accent-on-background, rgba(0, 0, 0, 0.54));
  }
  .nutrients-totals__metric-value {
    white-space: nowrap;
  }
  @media only screen and (min-width: 1200px) {
    .nutrients-totals__metric {
      width: 146px;
    }
    .nutrients-totals__metric-label {
      font-size: 14px;
    }
    .nutrients-totals__metric-value {
      font-size: 18px;
    }
  }
</style>
