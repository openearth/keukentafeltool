export const state = () => ({
  overlays: [],
})

export const mutations = {
  add(state, overlay) {
    state.overlays = [ ...state.overlays, overlay ]
  },
  remove(state, id) {
    state.overlays = state.overlays.filter(overlay => overlay.id !== id)
  }
}

export const actions = {
  add({ commit, rootGetters }, overlay) {
    const map = rootGetters['mapbox/map']

    if(!map.getLayer(overlay.id)) {
      map.addLayer(overlay)
      commit('add', overlay)
    }
  },
  setOpacity({ rootGetters }, { id, opacity }) {
    const map = rootGetters['mapbox/map']

    if(map.getLayer(id)) {
      map.setPaintProperty(id, 'raster-opacity', opacity)
    }
  },
  remove({ rootGetters }, id) {
    const map = rootGetters['mapbox/map']

    if(map.getLayer(id)) {
      map.removeLayer(id)
      map.removeSource(id)
      commit('remove', id)
    }
  }
}
