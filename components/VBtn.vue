<template>
  <div>
    <button @click="$emit('action')" :disabled="$parent.loaderRequest" :type="type"
            :class="['c-btn',classBtn]">
      <span v-if="$parent.loaderRequest"><LoaderDots :color="colorLoader"></LoaderDots></span>
      <slot v-else/>
    </button>
  </div>
</template>

<script>
export default {
  name: "VBtn",
  props: {
    type: {
      type: String,
      default: 'submit'
    },
    btn: {
      type: String,
      default: 'primary'
    }
  },
  data() {
    return {
      colorLoader: '#fff'
    }
  },
  computed: {
    classBtn() {
      if (this.btn === 'primary') {
        this.colorLoader = '#fff'
        return 'c-btn--primary';
      }
      if (this.btn === 'outline') {
        this.colorLoader = '#444'
        return 'c-btn--outline';
      }
      if (this.btn === 'block') {
        this.colorLoader = '#444'
        return 'c-btn--block';
      }
      if (this.btn === 'simple') {
        this.colorLoader = '#444'
        return '';
      }
    }
  }
}
</script>

<style scoped>

</style>
