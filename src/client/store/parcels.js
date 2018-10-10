export const state = () => ({
  parcels: []
})

export const mutations = {
  addParcel(state, feature) {
    state.parcels = [ ...state.parcels, Object.freeze({ ...feature }) ]
  },
  removeParcel(state, id) {
    state.parcels = state.parcels.filter((parcel) => parcel.id !== id)
  }
}
