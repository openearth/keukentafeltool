<template>
  <div class="parcels-list">
    <parcel-card
      v-for="(parcel, index) in parcels"
      :key="parcel.id"
      :index="index"
      :parcel="parcel"
      class="parcel-card" />
  </div>
</template>

<script>
import DataParcels from '../../components/input-panel/input-panel.stub.json'
import ParcelCard from '../../components/input-panel/parcel-card'
export default {
  name: 'ParcelsList',
  components: {
    ParcelCard
  },
  data () {
    return {
      parcels: DataParcels,
      type: '',
      show: false
    }
  }
}
</script>

<style>

</style>
