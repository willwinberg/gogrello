<template>
  <app-drop
    @drop="moveTaskOrColumn"
  >
    <app-drag
      class="task"
      :transferData="{
        type: 'task',
        fromColumnIndex: columnIndex,
        fromTaskIndex: taskIndex
      }"
      @click="openTask(task)"

    >
      <span class="w-full flex-no-shrink font-bold">{{task.name}}</span>
      <p class="w-full flex-no-shrink mt-1 text-sm" v-if="task.description">{{task.description}}</p>
    </app-drag>
  </app-drop>
</template>

<script>
import movingTaskOrColumnMixin from '@/mixins/movingTaskOrColumnMixin'
import AppDrag from './AppDrag'
import AppDrop from './AppDrop'

export default {
  components: {
    AppDrag,
    AppDrop
  },
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
    }
  }
}
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}
</style>
