import parcel from '../lib/_mapbox/layer-factory/parcel.js';

const measures = require('./measures.json')

export const state = () => ({
  measures: measures,
  parcelsPerMeasure: {}
})

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
