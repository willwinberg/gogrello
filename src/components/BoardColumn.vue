<template>
  <app-drop
    @drop="moveTaskOrColumn"
  >
    <app-drag
      class="column"
      :transferData="{
        type: 'column',
        fromColumnIndex: columnIndex
      }"
    >
      <div class="flex items-center mb-2 font-bold">{{column.name}}</div>
      <div class="list-reset">
        <column-task
          v-for="(task, $taskIndex) of column.tasks"
          :key="$taskIndex"
          :task="task"
          :taskIndex="$taskIndex"
          :column="column"
          :columnIndex="columnIndex"
          :board="board"
        />
        <input
          class="block p-2 w-full bg-transparent"
          placeholder="+ Enter new task"
          @keyup.enter="createTask($event, column.tasks)"
          type="text"
        />
      </div>
    </app-drag>
  </app-drop>
</template>

<script>
import ColumnTask from './ColumnTask'
import AppDrag from './AppDrag'
import AppDrop from './AppDrop'
import movingTaskOrColumnMixin from '@/mixins/movingTaskOrColumnMixin'

export default {
  components: {
    ColumnTask,
    AppDrag,
    AppDrop
  },
  mixins: [movingTaskOrColumnMixin],
  methods: {
    createTask (e, tasks) {
      this.$store.commit('task/CREATE_TASK', {
        tasks,
        name: e.target.value
      })
      e.target.value = ''
    },
    pickupColumn (e, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'column')
    }
  }
}
</script>

<style lang="css">
.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
