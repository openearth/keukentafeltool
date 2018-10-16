<template>
  <div>
    <md-table
      v-model="parcelProperties"
      md-sort="id"
      md-sort-order="asc"
      md-card
      md-fixed-header
    >
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
      >

        <md-table-cell
          md-label="Perceel"
          md-sort-by="id"
          md-numeric
        >
          {{ item.id }}
        </md-table-cell>

        <md-table-cell
          md-label="Gewas"
          md-sort-by="gewas"
        >
          {{ item.gws_gewas }}
        </md-table-cell>

        <md-table-cell
          md-label="Maatregelen"
          md-sort-by="gewas"
        >
          -
        </md-table-cell>
        <md-table-cell
          md-label="Oppervlakte"
          md-sort-by="oppervlakte"
        >
          {{ item.oppervlakte }} ha
        </md-table-cell>

        <md-table-cell
          md-label="Grondsoort"
          md-sort-by="grondsoort"
        >
          {{ item.gewascategorie }}
        </md-table-cell>

        <md-table-cell
          md-label="Drainage"
          md-sort-by="drainage"
        >
          {{ item.drain }}
        </md-table-cell>

        <md-table-cell
          md-label="Kwel"
          md-sort-by="kwel"
          md-numeric
        >
          {{ item.kwel }}
        </md-table-cell>

        <md-table-cell
          md-label="GHG"
          md-sort-by="ghg"
          md-numeric
        >
          {{ item.ghg }}
        </md-table-cell>

        <md-table-cell
          md-label="GLG"
          md-sort-by="glg"
          md-numeric
        >
          {{ item.glg }}
        </md-table-cell>

      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  props: {
    parcels: {
      type: Array,
      required: true,
      default: () => [],
      validator() { return true }
    }
  },
  computed: {
    parcelProperties() {
      const x = this.parcels.map(parcel => parcel.properties)

      console.log('MEEEEH', x)
      return this.parcels.map(parcel => parcel.properties)
    }
  }
}
</script>
