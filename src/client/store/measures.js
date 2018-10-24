const measures = require('./measures.json')

export const state = () => ({
  measures: measures,
  assignedMeasures: {}
})

export const mutations = {
  assignMeasure(state, { id, measure }) {
    const measures = state.assignedMeasures[id] || []

    if(measures.includes(measure)) {
      return
    }

    state.assignedMeasures = {
      ...state.assignedMeasures,
      [ id ]: [ ...measures, measure ]
    }
  },
  unassignMeasure(state, { id, measure }) {
    state.assignedMeasures = {
      ...state.assignedMeasures,
      [ id ]: [ ...state.assignedMeasures[id].filter(currentMeasure => currentMeasure.id !== measure.id) ]
    }
  }
}

export const getters = {
  parcelsPerMeasure({ assignedMeasures }) {
    return Object.keys(assignedMeasures).reduce((parcelsPerMeasure, id) => {
      const measures = assignedMeasures[id]
      measures.forEach(measure => {
        const parcelPerMeasure = parcelsPerMeasure[measure.id] || []
        parcelsPerMeasure[measure.id] = [ ...parcelPerMeasure, id ]
      })
      return parcelsPerMeasure
    }, {})
  }
}
