<template>
  <md-table
    v-model="parcelProperties"
    class="parcels-table"
  >
    <md-table-row
      slot="md-table-row"
      slot-scope="{ item }"
    >
      <md-table-cell md-label="Perceel">{{ item.id }}</md-table-cell>
      <md-table-cell
        :class="`parcels-table__vegetation--${item.gewascategorie.toLowerCase()}`"
        class="parcels-table__vegetation parcels-table__cell--text"
        md-label="Gewas"
      >{{ item.gewas }}
      </md-table-cell>
      <md-table-cell md-label="Maatregelen" />
      <md-table-cell
        md-label="Opp. (ha)"
        md-numeric
      >{{ formatNumber(item.areaal) }}</md-table-cell>
      <md-table-cell
        md-label="Grondsoort"
        class="parcels-table__cell--text"
      >{{ item.bodemgroep.toLowerCase() }}
      </md-table-cell>
      <md-table-cell
        md-label="Drainage"
        class="parcels-table__cell--text"
      >{{ item.drain ? 'ja' : 'nee' }}
      </md-table-cell>
      <md-table-cell
        md-label="Kwel (m)"
        md-numeric
      >{{ formatCmAsMeter(item.kwel) }}</md-table-cell>
      <md-table-cell
        md-label="GHG (m)"
        md-numeric
      >{{ formatCmAsMeter(item.ghg) }}</md-table-cell>
      <md-table-cell
        md-label="GLG (m)"
        md-numeric
      >{{ formatCmAsMeter(item.glg) }}</md-table-cell>
    </md-table-row>
  </md-table>
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
  computed: {
    parcelProperties() {
      return this.parcels.map(parcel => parcel.properties)
    },
  },
  methods: {
    formatCmAsMeter(value) {
      if (!isNumber(value)) return ''
      const valueInCm = toNumber(value)
      const valueInMeter = valueInCm / 100
      return this.formatNumber(valueInMeter)
    },
    formatNumber(value) {
      if (!isNumber(value)) return ''
      return toNumber(value).toLocaleString(this.locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    },
    parcelColor() {
      return '#FF0000'
    },
  }
}
</script>

<style>
  .parcel-type {
    width: 5px;
    height: 5px;
  }

  .parcels-table__vegetation {
    position: relative;
  }

  .parcels-table__vegetation::before {
    content: "";
    width: 10px;
    height: 10px;
    position: absolute;
    top: calc(50% - 5px);
    border: 1px solid #ccc;
  }
  .parcels-table__vegetation--grasland::before {
    background-color: #D1FFB9;
  }
  .parcels-table__vegetation--bouwland::before {
    background-color: #FFFFDE;
  }
  .parcels-table__vegetation--braakland::before {
    background-color: #EBE0CE;
  }
  .parcels-table__vegetation--natuurterrein::before {
    background-color: #9BD37F;
  }
  .parcels-table__vegetation--overige::before {
    background-color: #D8D8D8;
  }

  /* fix for the vue-material fixed header table */
   .parcels-table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
  }

  .parcels-table .md-table-cell-container,
  .parcels-table .md-table-head-container {
    width: 120px;
  }

  .parcels-table tbody {
    display:block;
    width: 100%;
    overflow: auto;
    min-height: 51px; /* one row */
    max-height: 561px; /* 11 rows */
  }

  .parcels-table thead tr {
    display: block;
  }

  .parcels-table th,
  .parcels-table td {
    width: 200px;
  }

  .parcels-table__cell--text {
    text-transform: capitalize;
  }
</style>
