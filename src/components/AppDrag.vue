<template>
  <div
    draggable
    @dragstary.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    transferData: {
      type: Object,
      required: true
    }
  },
  methods: {
    onDrag (e) {
      e.dataTransfer.setData('payload', JSON.stringify(this.tansferData))
    }
  }
}
</script>

<style scoped>

</style>
