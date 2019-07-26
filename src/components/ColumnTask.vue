<template>
  <div class="list-reset">
    <div
      class="task"
      draggable
      @dragstart="pickupTask($event, taskIndex, columnIndex)"
      @click="openTask(task)"
      @dragover.prevent
      @dragenter.prevent
      @drop.stop="moveTaskOrColumn($event, column.tasks, columnIndex, taskIndex)"
    >
      <span class="w-full flex-no-shrink font-bold">{{task.name}}</span>
      <p class="w-full flex-no-shrink mt-1 text-sm" v-if="task.description">{{task.description}}</p>
    </div>
  </div>
</template>

<script>
import movingTaskOrColumnMixin from '@/mixins/movingTaskOrColumnMixin';

export default {
  mixins: [movingTaskOrColumnMixin],
  props: {
    task: {
      type: Object,
      require: true
    },
    taskIndex: {
      type: Number,
      require: true
    }
  },
  methods: {
    openTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    },
    pickupTask (e, taskIndex, fromColumnIndex) {
      e.dataTransfer.effectallowed = 'move';
      e.dataTransfer.dropEffect = 'move';

      e.dataTransfer.setData('from-task-index', taskIndex)
      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'task')
    }
  }
}
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}
</style>
