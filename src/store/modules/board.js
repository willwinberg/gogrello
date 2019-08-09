import defaultBoard from '../../default-board'

export const namespaced = true

export const state = JSON.parse(localStorage.getItem('board')) || defaultBoard

export const actions = {
  createColumn ({ commit }, name) {
    console.log('createColumn action called')
    commit('CREATE_COLUMN', name)
  },
  moveColumn ({ commit }, { fromColumnIndex, toColumnIndex }) {
    commit('MOVE_COLUMN', fromColumnIndex, toColumnIndex)
  }
}

export const mutations = {
  CREATE_COLUMN (state, name) {
    state.columns.push({
      name,
      tasks: []
    })
  },
  MOVE_COLUMN (state, fromColumnIndex, toColumnIndex) {
    const columnToMove = state.columns.splice(fromColumnIndex, 1)[0]
    state.columns.splice(toColumnIndex, 0, columnToMove)
  }
}
