<template>
  <div class="input-panel">
    <h2 class="a11y-sr-only">Input panel title</h2>
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
import { ParcelCard } from '../../components'

export default {
  components: {
    ParcelCard,
    type: ''
  },
  props: {
    parcels: {
      type: Array,
      default: () => [],
    }
  },
  data () {
    return {
      type: '',
      show: false
    }
  }
}
</script>

<style>
  .input-panel {
    padding: 16px;
    height: 100%;
    overflow-y: auto;
  }
</style>
