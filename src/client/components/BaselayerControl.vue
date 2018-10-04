<template>
  <div
    class="baselayer-control baselayer-thumbnail"
    @click="switchBaseLayer"
  >
    <img
      :src="thumbnail"
      :alt="altText"
      class="baselayer-thumbnail__image"
    >
  </div>
</template>

<script>
export default {
  props: {
    layers: {
      type: Array,
      required: true
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
    altText() {
      return `${this.layers[this.nextLayerIndex].title} thumbnail` || 'thumbnail'
    },
    thumbnail() {
      return this.layers[this.nextLayerIndex].thumbnail || ''
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
  .baselayer-thumbnail {
    width: 75px;
    height: 75px;
    margin-right: 1rem;
    margin-top: 1rem;
    cursor: pointer;
    border: 2px solid #aaa;
  }
</style>
