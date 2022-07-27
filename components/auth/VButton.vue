<template>
  <div>
    <button @click="$emit('actionClick')" :disabled="$parent.loaderRequest" :type="type" class="btn mt-3 btn-login">
      <LoaderDots v-if="$parent.loaderRequest" />
      <span v-else>{{ label }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "VButton",
  props: {
    type: {
      type: String,
      default: 'submit'
    },
    label: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "assets/scss/auth.scss";
</style>
