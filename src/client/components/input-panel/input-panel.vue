<template>
  <div class="input-panel">
    <h2>Input panel title</h2>
    <parcels-list />
  </div>
</template>

<script>
import ParcelsList from '../../components/input-panel/parcels-list'
export default {
  components: {
    ParcelsList
  }
}
</script>

<style>
  .input-panel {
    padding: 16px;
  }
</style>
