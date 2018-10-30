import getMeasures from '../lib/get-measures'

let gettingMeasures

export const state = () => ({
  measures: [],
  parcelsPerMeasure: {},
})

export const actions = {
  getMeasures({ state, commit }) {
    if (gettingMeasures) return
    gettingMeasures = getMeasures()
      .then(measures => commit('setMeasures', measures))
      .catch(err => {
        gettingMeasures = undefined
      })
  }
}

export const mutations = {
  assignMeasure(state, { parcelId, measure }) {
    const parcelIds = state.parcelsPerMeasure[measure.id] || []

    if(parcelIds.includes(parcelId)) {
      return
    }

    state.parcelsPerMeasure = {
      ...state.parcelsPerMeasure,
      [ measure.id ]: [ ...parcelIds, parcelId ]
    }

  },
  setMeasures(state, measures) {
    state.measures = measures
  },
  unassignMeasure(state, { parcelId, measure }) {
    const parcelIds = state.parcelsPerMeasure[measure.id]
    const filteredParcelIds = parcelIds.filter(currentParcelId => currentParcelId !== parcelId)

    state.parcelsPerMeasure = {
      ...state.parcelsPerMeasure,
      [ measure.id ]: [ ...filteredParcelIds ]
    }
  }
}

export const getters = {
  measuresPerParcel({ parcelsPerMeasure }) {
    return Object.keys(parcelsPerMeasure).reduce((measuresPerParcel, measureId) => {
      const parcelIds = parcelsPerMeasure[measureId]

      parcelIds.forEach(parcelId => {
        const parcelMeasures = measuresPerParcel[parcelId] || []
        measuresPerParcel[parcelId] = [ ...parcelMeasures, measureId ]
      })

      return measuresPerParcel
    }, {})
  },
}
