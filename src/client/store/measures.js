import parcel from '../lib/_mapbox/layer-factory/parcel.js';

const measures = require('./measures.json')

export const state = () => ({
  measures: measures,
  assignedMeasures: {}
})

export const mutations = {
  assignMeasure(state, { parcelId, measure }) {
    const parcelIds = state.assignedMeasures[measure.id] || []

    if(parcelIds.includes(parcelId)) {
      return
    }

    state.assignedMeasures = {
      ...state.assignedMeasures,
      [ measure.id ]: [ ...parcelIds, parcelId ]
    }

  },
  unassignMeasure(state, { parcelId, measure }) {
    const parcelIds = state.assignedMeasures[measure.id]
    const filteredParcelIds = parcelIds.filter(currentParcelId => currentParcelId !== parcelId)

    state.assignedMeasures = {
      ...state.assignedMeasures,
      [ measure.id ]: [ ...filteredParcelIds ]
    }
  }
}

export const getters = {
  measuresPerPracel({ assignedMeasures }) {
    return Object.keys(assignedMeasures).reduce((measuresPerPracel, measureId) => {
      const parcelIds = assignedMeasures[measureId]

      parcelIds.forEach(parcelId => {
        const parcelMeasures = measuresPerPracel[parcelId] || []
        measuresPerPracel[parcelId] = [ ...parcelMeasures, measureId ]
      })

      return measuresPerPracel
    }, {})
  },
}
