import { uuid } from '../../utils'

export const namespaced = true

export const state = {
  title: '',
  body: ''
}

export const mutations = {
  CREATE_TASK (state, { tasks, name }) {
    tasks.push({
      name,
      id: uuid(),
      description: ''
    })
  },
  UPDATE_TASK (state, { task, key, value }) {
    task[key] = value
    // Vue.set(task, key, value)
  },
  MOVE_TASK (state, { fromTasks, toTasks, fromTaskIndex, toTaskIndex }) {
    const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0]
    toTasks.splice(toTaskIndex, 0, taskToMove)
  }
}

export const getters = {
  getTask (state) {
    return id => {
      for (const column of state.board.columns) {
        for (const task of column.tasks) {
          if (task.id === id) {
            return task
          }
        }
      }
    }
  }
}
