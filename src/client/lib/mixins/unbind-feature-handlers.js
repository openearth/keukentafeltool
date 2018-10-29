export default {
  beforeDestroy() {
    const handlers = this.$store.state.mapbox.features.eventHandlers

    Object.keys(handlers).forEach(featureId => {
      const featureHandlers = handlers[featureId]
      Object.keys(featureHandlers).forEach(event => {
        this.$store.dispatch('mapbox/features/removeEventHandler', { event, featureId })
      })
    })
  }
}
