<template>
  <form
    class="parcels-table"
  >
    <md-table
      v-model="parcelProperties"
    >
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
      >
        <md-table-cell md-label="Perceel">
          {{ item.id || 'Onbekend' }}
        </md-table-cell>
        <md-table-cell
          :class="`parcels-table__vegetation--${item.gewascategorie.toLowerCase()}`"
          class="parcels-table__vegetation"
          md-label="Gewas"
        >{{ item.gewas }}</md-table-cell>
        <md-table-cell md-label="Maatregelen">
          Onbekend
        </md-table-cell>
        <md-table-cell
          md-label="Oppervlakte (ha)"
          md-numeric
        >
          {{ item.areaal || 'Onbekend' }}
        </md-table-cell>
        <md-table-cell md-label="Grondsoort">
          <div class="custom-select custom-select--w130">
            <select
              @input.prevent="updateProperty({index, id: item.id, key: 'gewascategorie', value: $event.target.value})"
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
        <md-table-cell md-label="Drainage">
          <div class="custom-select">
            <select
              @input.prevent="updateProperty({index, id: item.id, key: 'drain', value: Number($event.target.value)})"
            >
              <option
                :selected="item.drain === 1"
                value="1"
              >
                Ja
              </option>
              <option
                :selected="item.drain === 0"
                value="0"
              >
                Nee
              </option>
            </select>
          </div>
        </md-table-cell>
        <md-table-cell
          md-label="Kwel"
          md-numeric
        >
          {{ item.kwel || 'Onbekend' }}
        </md-table-cell>
        <md-table-cell
          md-label="GHG"
          md-numeric
        >
          {{ item.ghg || 'Onbekend' }}
        </md-table-cell>
        <md-table-cell
          md-label="GLG"
          md-numeric
        >
          {{ item.glg || 'Onbekend' }}
        </md-table-cell>
      </md-table-row>
    </md-table>
  </form>
</template>

<script>
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
      selected: '',
      index: null
    }
  },
  computed: {
    parcelProperties() {
      return this.parcels.map(parcel => parcel.properties)
    },
  },
  methods: {
    parcelColor() {
      return '#FF0000'
    },
    updateProperty(valueProperty) {
      this.$emit('updateProperty', valueProperty)
    }
  }
}
</script>

<style lang="scss">
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

  /*
  ** Custom select styling:
  ** Vue material select components
  ** do not work with the Vue material table
  ** decided together with  the designers that
  ** this is an oportunity to build a better
  ** custom solution. Fully css based.
  */

  .custom-select {
    position: relative;
    height: 40px;
    width: 90px;
    border: 1px solid transparent;
    margin-left: -10px; // For alignment in the table column

    &:after {
      content: '';
      position: absolute;
      top: 0;
      width: 0;
      height: 0;
      right: 10px;
      bottom: 0;
      margin: auto;
      border-style: solid;
      border-width: 5px 5px 0 5px;
      border-color: #000000 transparent transparent transparent;
      pointer-events: none;
    }

    &:before {
      width: 30px;
      position: absolute;
      top: 1px;
      right: 1px;
      bottom: 1px;
      content: '';
      pointer-events: none;
    }

    &:hover {
      transition: all 200ms ease-in-out;
      border: 1px solid rgba(0,0,0,0.5);
      background: #ffffff;
    }

    select {
      font-size: 14px;
      border: none;
      box-shadow: none;
      border-radius: 0;
      background: transparent;
      height: 100%;
      width: 100%;
      cursor: pointer;
      outline: none;
      padding-right: 30px;
      padding-left: 10px;

      // Disable default styling on ff
      -moz-appearance: none;

      // Disable ugly outline on firefox
      &:-moz-focusring {
        color: transparent;
        text-shadow: 0 0 0 #000;
      }

      // Disable default styling on webkit browsers
      -webkit-appearance: none;

      // Disable default arrow on IE 11+
      &::-ms-expand {
        display: none;
      }
    }
  }

  .custom-select--w130 {
    width: 130px;
  }

  // IE 9 only
  @media all and (min-width:0\0) and (min-resolution:.001dpcm){
    .custom-select{
      select {
        padding-right: 0;
      }

      &:after, &:before {
        display: none;
      }
    }
  }
</style>
