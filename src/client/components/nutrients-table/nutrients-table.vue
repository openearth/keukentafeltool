<template>
  <div class="md-content md-table nutrients-table md-theme-default">
    <div class="md-content md-table-content md-scrollbar md-theme-default">
      <table>
        <thead>
          <tr>
            <th class="md-table-head">
              <div class="md-table-head-container">
                <div class="md-table-head-label">
                  Perceel
                </div>
              </div>
            </th>
            <th class="md-table-head">
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
              <td class="md-table-cell md-numeric">
                <div class="md-table-cell-container">{{ formatNumber(parcel.properties.refno3) }}</div>
              </td>
              <td class="md-table-cell md-numeric">
                <div class="md-table-cell-container">{{ formatNumber(parcel.properties.refndrain) }}</div>
              </td>
              <td class="md-table-cell md-numeric">
                <div class="md-table-cell-container">{{ formatNumber(parcel.properties.refpdrain) }}</div>
              </td>
            </tr>
            <tr
              :key="parcel.id+'row2'"
              class="md-table-row"
            >
              <td class="md-table-cell">
                <div class="md-table-cell-container"><nobr>&Delta; door maatregelen</nobr></div>
              </td>
              <td class="md-table-cell md-numeric">
                <div class="md-table-cell-container">&nbsp;</div>
              </td>
              <td class="md-table-cell md-numeric">
                <div class="md-table-cell-container">&nbsp;</div>
              </td>
              <td class="md-table-cell md-numeric">
                <div class="md-table-cell-container">&nbsp;</div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
const toNumber = (value) => {
  const number = Number(value)
  return isNaN(number) ? undefined : number
}
const isNumber = (value) => {
  if (typeof value === undefined || typeof value === null) return false
  return !isNaN(Number(value))
}

export default {
  props: {
    parcels: {
      type: Array,
      required: true,
      default: () => [],
    }
  },
  data() {
    return {
      locale: 'nl-NL',
    }
  },
  methods: {
    formatNumber(value) {
      if (!isNumber(value)) return ''
      return toNumber(value).toLocaleString(this.locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    }
  }
}
</script>

<style>
  .nutrients-table {
    min-width: 500px;
  }
  .nutrients-table .md-table-head-container {
    height: 84px;
  }
  .nutrients-table .md-table-head-label {
    height: 56px;
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
</style>
