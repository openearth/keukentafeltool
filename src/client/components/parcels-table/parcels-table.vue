<template>
  <form
    class="parcels-table"
  >
    <md-table
      v-model="parcelProperties"
      md-fixed-header
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
        >{{ item.gewas }}</md-table-cell>
        <md-table-cell md-label="Maatregelen"> Onbekend </md-table-cell>
        <md-table-cell md-label="Oppervlakte (ha)">{{ item.areaal || 'Onbekend' }}</md-table-cell>
        <md-table-cell md-label="Grondsoort">
          <select @input.prevent="inputProperty({id: item.id, keyProperty: 'gewascategorie', valueProperty: $event.target.value})">
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
        </md-table-cell>
        <md-table-cell md-label="Drainage">
          <select @input.prevent="inputProperty({id: item.id, key: 'drain', valueProperty: $event.target.value})">
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
        </md-table-cell>
        <md-table-cell md-label="Kwel">{{ item.kwel || 'Onbekend' }}</md-table-cell>
        <md-table-cell md-label="GHG">{{ item.ghg || 'Onbekend' }}</md-table-cell>
        <md-table-cell md-label="GLG">{{ item.glg || 'Onbekend' }}</md-table-cell>
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
      selected: ''
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
    inputProperty(valueProperty) {
      this.$emit('inputProperty', valueProperty)
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
</style>
