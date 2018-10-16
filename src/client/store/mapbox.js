export const state = () => ({
  mapObject: {}
})

export const mutations = {
  initMap(state, map) {
    state.mapObject = Object.freeze({ map })
  }
}

export const actions = {
  removeMapClickHandler({ state }) {
    state.mapObject.map.fire('map/removeClickHandler')
  },
  removeOverlay({ state }, id) {
    state.mapObject.map.fire('overlays/removeOverlay', { id })
  }
}
