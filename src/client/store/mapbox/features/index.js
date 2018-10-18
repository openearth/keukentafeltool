import mapbox from '../../../lib/_mapbox/_mapbox'
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
  flyToFirstFeature({ state, rootGetters }) {
    if(state.features.length) {
      const map = rootGetters['mapbox/map']
      const coordinates = state.features[0].geometry.coordinates[0]
      const bounds = coordinates.reduce(function(bounds, coord) {
          return bounds.extend(coord);
      }, new mapbox.LngLatBounds());

      map.fitBounds(bounds, { zoom: 14 })
    }
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
