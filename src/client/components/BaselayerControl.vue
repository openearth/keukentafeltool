<template>
  <button
    class="baselayer-control"
    @click="switchBaseLayer"
  >
    <span class="a11y-sr-only">Switch to {{ nextLayer.title }}</span>
    <img
      :src="nextLayer.thumbnail"
      :alt="nextLayer.title"
      class="baselayer-control__image"
    >
  </button>
</template>

<script>
export default {
  props: {
    layers: {
      type: Array,
      required: true,
      validator (layers) {
        return layers.reduce((isValid, layer) => {
          return isValid
            && typeof layer.title === 'string'
            && typeof layer.thumbnail === 'string'
            && typeof layer.style === 'string'
        }, true)
      }
    },
    switchHandler: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      nextLayerIndex: 1
    }
  },
  computed: {
    nextLayer () {
      return this.layers[this.nextLayerIndex]
    }
  },
  methods: {
    switchBaseLayer() {
      this.switchHandler(this.layers[this.nextLayerIndex].style)
      this.nextLayerIndex = (this.nextLayerIndex + 1) % this.layers.length
    }
  }
}
</script>

<style>
  .baselayer-control {
    width: 75px;
    height: 75px;
    margin-right: 1rem;
    margin-top: 1rem;
    padding: 0;
    cursor: pointer;
    border: 2px solid #aaa;
  }
</style>
