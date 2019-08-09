<template>
  <div
    @drop.self="onDrop"
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
    onDrop (e) {
      const transferData = JSON.parse(e.dataTransfer.getData('payload'))

      this.$emit('drop', transferData)
    }
  }
}
</script>

<style scoped>

</style>
