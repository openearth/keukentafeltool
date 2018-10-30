<template>
  <form>
    <md-table
      v-model="parcelProperties"
      class="parcels-table"
    >
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
      >
        <md-table-cell md-label="Perceel">
          {{ item.id }}
        </md-table-cell>
        <md-table-cell
          :class="`parcels-table__vegetation--${item.gewascategorie.toLowerCase()}`"
          class="parcels-table__vegetation"
          md-label="Gewas"
        >{{ item.gewas }}</md-table-cell>
        <md-table-cell
          md-label="Gewascategorie">
          <div class="form-select">
            <select
              id="select"
              name="select"
              class="form-select__select"
              @input.prevent="updateProperty({id: item.id, key: 'gewascategorie', value: $event.target.value})"
            >
              <option
                :selected="item.gewascategorie === 'Grasland'"
                value="Grasland"
              >
                Grasland
              </option>
              <option
                :selected="item.gewascategorie === 'Bouwland'"
                value="Bouwland"
              >
                Bouwland
              </option>
              <option
                :selected="item.gewascategorie === 'Braakland'"
                value="Braakland"
              >
                Braakland
              </option>
              <option
                :selected="item.gewascategorie === 'Natuur'"
                value="Natuur"
              >
                Natuur
              </option>
            </select>
          </div>
        </md-table-cell>
        <md-table-cell
          md-label="Opp. (ha)"
          md-numeric
        >{{ formatNumber(item.areaal) }}</md-table-cell>
        <md-table-cell
          md-label="Grond"
          class="parcels-table__cell--text"
        >{{ item.bodemgroep.toLowerCase() }}
        </md-table-cell>
        <md-table-cell
          md-label="Drainage"
          numeric
        >
          <div class="form-select">
            <select
              class="form-select__select"
              @input.prevent="updateProperty({id: item.id, key: 'drain', value: Number($event.target.value)})"
            >
              <option
                :selected="item.drain === 2"
                value="2"
              >
                Verbeterd
              </option>
              <option
                :selected="item.drain === 1"
                value="1"
              >
                Wel
              </option>
              <option
                :selected="item.drain === 0"
                value="0"
              >
                Geen
              </option>
            </select>
          </div>
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
  </form>
</template>

<script>
import { FormSelect } from '../../components'

const toNumber = (value) => {
  const number = Number(value)
  return isNaN(number) ? undefined : number
}
const isNumber = (value) => {
  if (typeof value === undefined || typeof value === null) return false
  return !isNaN(Number(value))
}

export default {
  components: { FormSelect },
  props: {
    parcels: {
      type: Array,
      required: true,
      default: () => [],
    }
  },
  data() {
    return {
      locale: 'nl-NL'
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
    updateProperty(valueProperty) {
      this.$emit('updateProperty', valueProperty)
    }
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

  .parcels-table__input {
    border: none;
  }



  /*
  ** Fix for the vue-material fixed header table
  ** The component is not working with toggleing
  ** container width.
  */

  .parcels-table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
  }

  .parcels-table .md-table-cell-container,
  .parcels-table .md-table-head-container {
    width: 150px;
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

  /* Reset for numeric columns */
  .parcels-table .md-table-head.md-numeric,
  .parcels-table .md-table-cell.md-numeric {
    width: 100px;
  }
  .parcels-table .md-table-head.md-numeric .md-table-head-container,
  .parcels-table .md-table-cell.md-numeric .md-table-cell-container {
    width: 100px;
  }



</style>
