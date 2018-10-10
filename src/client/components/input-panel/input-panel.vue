<template>
  <div class="input-panel">
    <h2>Input panel title</h2>
    <div>
      <parcel-card
        v-for="(parcel, index) in parcels"
        :key="parcel.id"
        :index="index"
        :parcel="parcel"
        class="parcel-card" />
    </div>
  </div>
</template>

<script>
import DataParcels from '../../components/input-panel/input-panel.stub.json'
import { ParcelCard } from '../../components'

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
