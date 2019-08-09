export const namespaced = true
export const mutations = {
  CREATE_COLUMN (rootState, name) {
    console.log(rootState)
    rootState.board.columns.push({
      name,
      tasks: []
    })
  },
  MOVE_COLUMN (state, { columnList, fromColumnIndex, toColumnIndex }) {
    console.log(state.store)
    // const columnList = state.board.columns
    console.log('aaaaaaaa', columnList)
    const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
    columnList.splice(toColumnIndex, 0, columnToMove)
  }
}

export const actions = {
  createColumn ({ commit, dispatch, rootState }, name) {
    console.log('createColumn action called')
    console.log(rootState.board.columns)
    commit('CREATE_COLUMN', rootState, name)
  }
}

export const getters = {

}
