<template>
  <md-table
    v-model="parcelProperties"
    class="parcels-table"
  >

    <md-table-row
      slot="md-table-row"
      slot-scope="{ item }"
    >
      <md-table-cell md-label="Perceel">{{ item.id || 'Onbekend' }}</md-table-cell>
      <md-table-cell
        :class="`parcels-table__vegetation--${item.gewascategorie.toLowerCase()}`"
        class="parcels-table__vegetation"
        md-label="Gewas"
      >
        {{ item.gewas || 'Onbekend' }}
      </md-table-cell>
      <md-table-cell md-label="Maatregelen"> Onbekend </md-table-cell>
      <md-table-cell
        md-label="Oppervlakte (ha)"
        md-numeric
      >{{ item.areaal || 'Onbekend' }}</md-table-cell>
      <md-table-cell md-label="Grondsoort">{{ item.gewascategorie || 'Onbekend' }}</md-table-cell>
      <md-table-cell md-label="Drainage">{{ item.drain || 'Onbekend' }}</md-table-cell>
      <md-table-cell
        md-label="Kwel"
        md-numeric
      >{{ item.kwel || 'Onbekend' }}</md-table-cell>
      <md-table-cell
        md-label="GHG"
        md-numeric
      >{{ item.ghg || 'Onbekend' }}</md-table-cell>
      <md-table-cell
        md-label="GLG"
        md-numeric
      >{{ item.glg || 'Onbekend' }}</md-table-cell>
    </md-table-row>
  </md-table>
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
  computed: {
    parcelProperties() {
      return this.parcels.map(parcel => parcel.properties)
    },
  },
  methods: {
    parcelColor() {
      return '#FF0000'
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
</style>
