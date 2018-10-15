<template>
  <div class="input-panel">
    <h2>Perceelinformatie</h2>
    <template v-if="parcels.length">
      <parcel-card
        v-for="(parcel, index) in parcels"
        :key="parcel.id"
        :index="index"
        :parcel="parcel"
        class="parcel-card" />
    </template>
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
@import "../app-core/variables.css";

.input-panel {
  padding: 16px;
  height: 100%;
  overflow-y: auto;
  background-color: var(--background-light);
}
</style>
