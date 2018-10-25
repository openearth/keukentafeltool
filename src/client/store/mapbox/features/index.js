import geojsonExtent from '@mapbox/geojson-extent'

import layerFactory from '../../../lib/_mapbox/layer-factory'

export const state = () => ({
  eventHandlers: {},
  features: [],
})

export const mutations = {
  add(state, feature) {
    if(!state.features.some(storedFeature => storedFeature.id == feature.id)) {
      state.features = [ ...state.features, feature ]
    }
  },
  remove(state, id) {
    state.features = state.features.filter(feature => feature.id !== id)
  },
  updateParcelProperty(state, { id, key, value }) {
    const featureToUpdate = state.features.find(feature => feature.id === String(id))
    featureToUpdate.properties[key] = value
  }
}

export const actions = {
  add({ commit, rootGetters }, feature) {
    const map = rootGetters['mapbox/map']

    if(!map.getLayer(feature.id)) {
      map.addLayer(layerFactory.parcel({ feature }))
      commit('add', feature)
    }
  },
  fitToFeatures({ state, rootGetters }) {
    const map = rootGetters['mapbox/map']
    const { features } = state

    if(!features.length) {
      return
    }

    const bounds = geojsonExtent({
      type: 'FeatureCollection',
      features
    })

    map.fitBounds(bounds, { padding: 20 })
  },
  resetFeatures({ commit, state, rootGetters }) {
    const map = rootGetters['mapbox/map']

    state.features.forEach(({ id }) => {
      if(map.getLayer(id)) {
        map.removeLayer(id)
        map.removeSource(id)
        commit('remove', id)
      }
    })
  },
  setStyle({ rootGetters }, { id, styleOption ,value }) {
    const map = rootGetters['mapbox/map']

    if(map.getLayer(id)) {
      map.setPaintProperty(id, styleOption, value)
    }
  },
  remove({ commit, rootGetters }, id) {
    const map = rootGetters['mapbox/map']

    if(map.getLayer(id)) {
      map.removeLayer(id)
      map.removeSource(id)
      commit('remove', id)
    }
  }
}
