import getEffects from "../lib/get-effects";

export const state = () => ({
  effectsPerMeasure: [],
  totals: []
})

export const mutations = {
  setEffectsPerMeasure(state, effects) {
    state.effectsPerMeasure = effects
  },
  setTotals(state, totals) {
    state.totals = totals
  }
}

export const actions = {
  getEffects({ state, commit }, input) {
    getEffects(input)
      .then(response => {
        commit('setEffectsPerMeasure', response.data.effects)
        commit('setTotals', response.data.totals)
      })
  }
}

export const getters = {
  totalEffectsPerParcel(state) {
    return state.totals
      .reduce((totals, effect) => {
        return { ...totals, [ effect.pid ]: effect }
      }, {})
  }
}
