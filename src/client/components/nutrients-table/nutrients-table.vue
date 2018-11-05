<template>
  <div class="ktt-table nutrients-table">
    <div class="ktt-table__container ktt-table__slide--horizontal">
      <div class="ktt-table__static-header md-elevation-3">
        <table>
          <thead>
            <tr>
              <th>
                <div class="ktt-table__cell ktt-table__cell--w70">
                  Perceel
                </div>
              </th>
              <th>
                <div class="ktt-table__cell ktt-table__cell--w125" />
              </th>
              <th>
                <div class="ktt-table__cell ktt-table__cell--numeric nutrients-table__cell--nutrient">
                  Nitraat <br>(NO<sub>3</sub> mg/l)
                </div>
              </th>
              <th>
                <div class="ktt-table__cell ktt-table__cell--numeric nutrients-table__cell--nutrient">
                  Stikstof <br>(Vracht N kg/ha)
                </div>
              </th>
              <th>
                <div class="ktt-table__cell ktt-table__cell--numeric nutrients-table__cell--nutrient">
                  Fosfor <br>(Vracht P kg/ha)
                </div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="ktt-table__slide--vertical">
        <table>
          <tbody>
            <template
              v-for="parcel in parcels"
            >
              <tr
                :key="parcel.id"
              >
                <td rowspan="2">
                  <div class="ktt-table__cell ktt-table__cell--w70">{{ parcel.id }}</div>
                </td>
                <td>
                  <div class="ktt-table__cell ktt-table__cell--w125">Referentie</div>
                </td>
                <td
                  v-for="metric in metrics"
                  :key="metric"
                >
                  <div class="ktt-table__cell ktt-table__cell--numeric nutrients-table__cell--nutrient">
                    {{ formatNumber(parcel.properties[`ref${metric}`]) }}
                  </div>
                </td>
              </tr>
              <tr
                :key="parcel.id+'row2'"
              >
                <td>
                  <div class="ktt-table__cell ktt-table__cell--w125"><nobr>Na maatregelen</nobr></div>
                </td>
                <td
                  v-for="metric in metrics"
                  :key="metric"
                >
                  <div class="ktt-table__cell ktt-table__cell--numeric nutrients-table__cell--nutrient">
                    <template v-if="isLoaded">
                      {{ effect({ parcelId: parcel.id, metric }) }}
                    </template>
                    <skeleton-value
                      v-else
                      class="nutrients-table__skeleton-value"
                    />
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
import SkeletonValue from '../skeleton-value'
import formatNumber from '../../lib/format-number'

export default {
  components: { SkeletonValue },
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
  data() {
    return {
      metrics: ['no3', 'ndrain', 'pdrain'],
    }
  },
  computed: {
    isLoaded() { return this.effects.length > 0 },
  },
  methods: {
    effect({ parcelId, metric }) {
      if (!this.effects.length) return ''
      const value = this.effects
        .filter(effect => String(effect.pid) === String(parcelId))
        .map(effect => effect[`eff${metric}`])
        .reduce((total, value) => total + value, 0)
      return formatNumber({ value })
    },
    formatNumber(value) {
      return formatNumber({ value })
    },
  }
}
</script>

<style>
  .nutrients-table__skeleton-value {
    width: 2.5em;
  }
  .ktt-table__cell.nutrients-table__cell--nutrient {
    width: 88px;
  }
  @media only screen and (min-width: 1200px) {
    .ktt-table__cell.nutrients-table__cell--nutrient {
      width: 135px;
    }
  }
</style>
