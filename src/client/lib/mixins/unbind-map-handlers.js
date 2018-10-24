export default {
  beforeDestroy() {
    const handlers = this.$store.state.mapbox.eventHandlers

    Object.keys(handlers).forEach(event => {
      this.$store.dispatch('mapbox/removeEventHandler', { event })
    })
  }
}
