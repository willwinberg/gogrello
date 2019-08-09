export default {
  props: {
    column: {
      type: Object,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    },
    board: {
      type: Object,
      required: true
    }
  },
  methods: {
    moveTask ({ fromColumnIndex, fromTaskIndex }) {
      const fromTasks = this.board.columns[fromColumnIndex].tasks

      this.$store.commit('task/MOVE_TASK', {
        fromTasks,
        fromTaskIndex,
        toTasks: this.column.tasks,
        toTaskIndex: this.taskIndex
      })
    },
    moveColumn ({ fromColumnIndex }) {
      console.log('called')
      this.$store.commit('column/MOVE_COLUMN', {
        columnList: this.board.columns,
        fromColumnIndex,
        toColumnIndex: this.columnIndex
      })
    },
    moveTaskOrColumn (transferData) {
      if (transferData.type === 'task') {
        this.moveTask(transferData)
      } else {
        this.moveColumn(transferData)
      }
    }
  }
}
