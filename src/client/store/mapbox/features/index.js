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
  addEventHandler(state, { id, event, handler }) {
    state.eventHandlers = {
      ...state.eventHandlers,
      [ id ]: {
        ...state.eventHandlers[id],
        [ event ]: handler
      }
    }
  },
  remove(state, id) {
    state.features = state.features.filter(feature => feature.id !== id)
  },
  removeEventHandler(state, { event, featureId }) {
    const featureEventHandlers = state.eventHandlers[featureId]

    state.eventHandlers = {
      ...state.eventHandlers,
      [ featureId ]: {
        ...featureEventHandlers,
        [ event ]: undefined
      }
    }
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
  addEventHandler({ commit, rootGetters }, { id, event, handler }) {
    const map = rootGetters['mapbox/map']

    map.on(event, id, handler)
    commit('addEventHandler', { id, event, handler })
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
  },
  removeEventHandler({ commit, rootGetters, state }, { event, featureId }) {
    const map = rootGetters['mapbox/map']

    map.off(event, featureId, state.eventHandlers[featureId][event])
    commit('removeEventHandler', { event, featureId })
  }
}
