export const namespaced = true
export const mutations = {
  MOVE_COLUMN (columnList, fromColumnIndex, toColumnIndex ) {
    const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
    columnList.splice(toColumnIndex, 0, columnToMove)
  }
}

export const actions = {
  moveColumn ({ commit }, { columnList, fromColumnIndex, toColumnIndex }) {
    commit('MOVE_COLUMN', columnList, fromColumnIndex, toColumnIndex)
  }
}

export const getters = {

}
