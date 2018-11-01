<template>
  <div class="md-content md-table nutrients-table md-theme-default">
    <div class="md-content md-table-content md-scrollbar md-theme-default">
      <table>
        <thead>
          <tr>
            <th class="md-table-head nutrients-table__column--parcels">
              <div class="md-table-head-container">
                <div class="md-table-head-label">
                  Perceel
                </div>
              </div>
            </th>
            <th class="md-table-head nutrients-table__column--labels">
              <div class="md-table-head-container">
                <div class="md-table-head-label" />
              </div>
            </th>
            <th class="md-table-head md-numeric">
              <div class="md-table-head-container">
                <div class="md-table-head-label">
                  Nitraat <br>(NO<sub>3</sub> mg/l)
                </div>
              </div>
            </th>
            <th class="md-table-head md-numeric">
              <div class="md-table-head-container">
                <div class="md-table-head-label">
                  Stikstof <br>(N<small>drain</small> kg/ha)
                </div>
              </div>
            </th>
            <th class="md-table-head md-numeric">
              <div class="md-table-head-container">
                <div class="md-table-head-label">
                  Fosfor <br>(P<small>drain</small> kg/ha)
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <template
            v-for="parcel in parcels"
          >
            <tr
              :key="parcel.id"
              class="md-table-row"
            >
              <td
                class="md-table-cell nutrients-table__parcel-id-cell"
                rowspan="2"
              >
                <div class="md-table-cell-container">{{ parcel.id }}</div>
              </td>
              <td class="md-table-cell">
                <div class="md-table-cell-container">Referentie</div>
              </td>
              <td
                v-for="metric in metrics"
                :key="metric"
                class="md-table-cell md-numeric"
              >
                <div class="md-table-cell-container">
                  {{ formatNumber(parcel.properties[`ref${metric}`]) }}
                </div>
              </td>
            </tr>
            <tr
              :key="parcel.id+'row2'"
              class="md-table-row"
            >
              <td class="md-table-cell">
                <div class="md-table-cell-container"><nobr>&Delta; door maatregelen</nobr></div>
              </td>
              <td
                v-for="metric in metrics"
                :key="metric"
                class="md-table-cell md-numeric"
              >
                <div class="md-table-cell-container">
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
  .nutrients-table {
    min-width: 500px;
    width: 100%;
    flex: 1 1 auto;
  }
  .nutrients-table .md-table-head-container {
    height: 84px;
  }
  .nutrients-table .md-table-head-label {
    height: 56px;
  }
  .nutrients-table__column--parcels {
    width: 110px;
  }
  .nutrients-table__column--labels {
    width: 235px;
  }
  .nutrients-table__skeleton-value {
    width: 2.5em;
  }

  /*
  ** Fix for layout we would like to have the parcel id aligned at the top of the cell
  ** Can only be done by overriding the fixed height with our own fixed height.
  ** Twice the row height minus the row padding.
  */
  .nutrients-table .nutrients-table__parcel-id-cell .md-table-cell-container {
    height: 78px;
  }
  /*
  ** fix for funny hover state due to row span
  */
  .md-table.nutrients-table .md-table-row:hover:not(.md-header-row) .md-table-cell.nutrients-table__parcel-id-cell {
    background: #ffffff;
  }
    /* Reset for numeric columns */
  .nutrients-table .md-table-head.md-numeric,
  .nutrients-table .md-table-cell.md-numeric {
    width: 110px;
  }
  .nutrients-table .md-table-head.md-numeric .md-table-head-container,
  .nutrients-table .md-table-cell.md-numeric .md-table-cell-container {
    width: 100%;
  }
</style>
