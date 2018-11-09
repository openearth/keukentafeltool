<template>
  <div
    v-resize:debounce="resize"
    class="mapbox-map"
  >
    <div
      ref="mapboxMap"
      class="mapbox-map__canvas"
    />
    <zoom-controls
      class="mapbox-map__zoom-controls"
      @auto-focus="$emit('autoFocus')"
      @zoom-in="zoomIn"
      @zoom-out="zoomOut"
    />
  </div>
</template>

<script>
import ZoomControls from '../zoom-controls'
import mapFactory from '../../lib/_mapbox/map-factory'

export default {
  components: { ZoomControls },
  props: {
    listenersTransformFunction: {
      type: Function,
      required: false,
      default: undefined
    }
  },
  async mounted() {
    this.map = mapFactory(this.$refs.mapboxMap)
    this.setupListeners(this.map)
    this.$emit('mapCreated', this.map)
  },
  methods: {
    resize() {
      this.map.resize() // force redraw of the Mapbox map
    },
    setupListeners(map) {
      if(this.listenersTransformFunction) {
        this.listenersTransformFunction(this.$listeners, map)
      } else {
        Object.keys(this.$listeners)
          .forEach(key => map.on(key.replace('_', '/'), this.$listeners[key]))
      }

    },
    zoomIn() {
      this.map.zoomIn()
    },
    zoomOut() {
      this.map.zoomOut()
    }
  }
}
</script>

<style>
  .mapbox-map,
  .mapbox-map__canvas {
    width: 100%;
    height: 100%;
  }
  .mapbox-map {
    position: relative;
  }

  .mapbox-map__zoom-controls {
    position: absolute;
    bottom: 10px;
    left: 5px;
  }
</style>
