<template>
  <div class="input-panel">
    <h2>Input panel title</h2>
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
import ParcelCard from '../../components/parcel-card/parcel-card'
export default {
  components: {
    ParcelCard,
    type: ''
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
  .input-panel {
    padding: 16px;
  }
</style>
