export default {
  mounted() {
    const features = this.$store.state.mapbox.features
    if (features && features.features.length) {
      this.$emit('hasRequiredFeatures')
    } else {
      // If the user had not selected parcels redirect to the select parcels view
      this.$router.replace('/farm/')
    }
  }
}
