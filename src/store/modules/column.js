export const namespaced = true

export const state = {
  title: '',
  body: ''
}

export const mutations = {
  CREATE_COLUMN (state, { name }) {
    state.board.columns.push({
      name,
      tasks: []
    })
  },
  MOVE_COLUMN (state, { fromColumnIndex, toColumnIndex }) {
    const columnList = state.board.columns
    const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
    columnList.splice(toColumnIndex, 0, columnToMove)
  }
}

export const actions = {

}

export const getters = {

}
