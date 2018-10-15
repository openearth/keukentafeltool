export default function ({ store, redirect }) {
  const parcels = store.state.parcels

  // If the user had not selected parcels redirect to the select parcels view
  if (!parcels || !parcels.parcels.length) {
    return redirect('/farm')
  }
}
