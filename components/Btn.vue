<template>
  <div>
    <button :disabled="loading" :type="type" :class="classes">
      <b-spinner small v-if="loading"></b-spinner>
      {{ name }}
    </button>
  </div>
</template>

<script>
export default {
  name: "Btn",
  props: {
    name: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    type: {
      type: String,
      default: 'submit'
    },
    classes: {
      type: String
    }
  }
}
</script>

<style scoped>

</style>
