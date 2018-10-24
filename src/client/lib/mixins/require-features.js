export default {
  mounted() {
    const features = this.$store.state.mapbox.features
    // If the user had not selected parcels redirect to the select parcels view
    if (!features || !features.features.length) {
      this.$router.replace('/farm/')
      return false
    }

    this.$emit('hasRequiredFeatures')
    return true
  }
}
