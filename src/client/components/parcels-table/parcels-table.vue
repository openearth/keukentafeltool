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
          md-label="ID"
          md-sort-by="id"
          md-numeric
        >
          {{ item.id }}
        </md-table-cell>
        <md-table-cell
          md-label="Kwel"
          md-sort-by="kwel"
        >
          {{ item.kwel }}
        </md-table-cell>
        <md-table-cell
          md-label="Oppervlakte"
          md-sort-by="oppervlakte"
        >
          {{ item.oppervlakte }}
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
