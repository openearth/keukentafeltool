export default function ({ store, redirect }) {
  const features = store.state.mapbox.features

  // If the user had not selected parcels redirect to the select parcels view
  if (!features || !features.features.length) {
    redirect('/farm')
  }
}
